import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export function TouchlessScroll() {
	const [enabled, setEnabled] = useState(false);
	const [sensitivity, setSensitivity] = useState(1);
	const [isMirrored, setIsMirrored] = useState(true);
	const [status, setStatus] = useState("Touchless scroll is off");

	const videoRef = useRef(null);
	const cursorRef = useRef(null);
	const streamRef = useRef(null);
	const handLandmarkerRef = useRef(null);
	const frameRef = useRef(null);
	const lastYRef = useRef(null);
	const lastTimestampRef = useRef(null);
	const lastScrollTriggerRef = useRef(0);
	const lastPinchClickRef = useRef(0);
	const pinchActiveRef = useRef(false);
	const sensitivityRef = useRef(1);
	const isMirroredRef = useRef(true);

	const setCursorState = (visible, x = 0, y = 0, isPinching = false) => {
		if (!cursorRef.current) {
			return;
		}

		cursorRef.current.style.opacity = visible ? "1" : "0";
		cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
		cursorRef.current.classList.toggle("pinching", isPinching);
	};

	const clickAtPoint = (x, y) => {
		const target = document.elementFromPoint(x, y);
		if (!target) {
			return;
		}

		const clickable = target.closest(
			'a, button, [role="button"], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])'
		);

		if (!(clickable instanceof HTMLElement) || clickable.hasAttribute("disabled")) {
			return;
		}

		clickable.focus({ preventScroll: true });
		clickable.click();
	};

	useEffect(() => {
		sensitivityRef.current = sensitivity;
	}, [sensitivity]);

	useEffect(() => {
		isMirroredRef.current = isMirrored;
	}, [isMirrored]);

	const stopDetection = () => {
		if (frameRef.current) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}

		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}

		if (videoRef.current) {
			videoRef.current.srcObject = null;
		}

		lastYRef.current = null;
		lastTimestampRef.current = null;
		pinchActiveRef.current = false;
		setCursorState(false);
	};

	useEffect(() => {
		let isCancelled = false;

		const startDetection = async () => {
			try {
				setStatus("Requesting camera permission...");

				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: "user" },
					audio: false,
				});

				if (isCancelled) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}

				streamRef.current = stream;

				if (!videoRef.current) {
					return;
				}

				videoRef.current.srcObject = stream;
				await videoRef.current.play();

				if (!handLandmarkerRef.current) {
					setStatus("Loading hand tracking model...");
					const vision = await FilesetResolver.forVisionTasks(WASM_URL);

					handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
						baseOptions: {
							modelAssetPath: MODEL_URL,
						},
						runningMode: "VIDEO",
						numHands: 1,
					});
				}

				if (isCancelled || !videoRef.current) {
					return;
				}

				setStatus("Touchless scroll is active");

				const detectFrame = () => {
					if (!videoRef.current || !handLandmarkerRef.current) {
						return;
					}

					const now = performance.now();
					const result = handLandmarkerRef.current.detectForVideo(videoRef.current, now);

					if (result.landmarks?.[0]?.length) {
						const hand = result.landmarks[0];
						const palmCenterY = hand[9].y;
						const indexTip = hand[8];
						const thumbTip = hand[4];

						const mappedX = isMirroredRef.current ? 1 - indexTip.x : indexTip.x;
						const mappedY = 1 - indexTip.y;
						const cursorX = Math.max(0, Math.min(window.innerWidth, mappedX * window.innerWidth));
						const cursorY = Math.max(0, Math.min(window.innerHeight, mappedY * window.innerHeight));

						const pinchDistance = Math.hypot(
							thumbTip.x - indexTip.x,
							thumbTip.y - indexTip.y,
							thumbTip.z - indexTip.z
						);

						const pinchStartThreshold = 0.045;
						const pinchReleaseThreshold = 0.065;
						const pinchCooldown = now - lastPinchClickRef.current;

						if (!pinchActiveRef.current && pinchDistance < pinchStartThreshold && pinchCooldown > 450) {
							clickAtPoint(cursorX, cursorY);
							pinchActiveRef.current = true;
							lastPinchClickRef.current = now;
						}

						if (pinchActiveRef.current && pinchDistance > pinchReleaseThreshold) {
							pinchActiveRef.current = false;
						}

						setCursorState(true, cursorX, cursorY, pinchActiveRef.current);

						if (lastYRef.current !== null && lastTimestampRef.current !== null) {
							const dy = palmCenterY - lastYRef.current;
							const dt = now - lastTimestampRef.current;
							const cooldown = now - lastScrollTriggerRef.current;

							const movementThreshold = 0.028 / sensitivityRef.current;
							const maxFrameGap = 180;

							if (Math.abs(dy) > movementThreshold && dt <= maxFrameGap && cooldown > 320) {
								const swipeUp = dy < 0;
								const scrollDistance = Math.round(280 * sensitivityRef.current);

								window.scrollBy({
									top: swipeUp ? scrollDistance : -scrollDistance,
									left: 0,
									behavior: "smooth",
								});

								lastScrollTriggerRef.current = now;
							}
						}

						lastYRef.current = palmCenterY;
						lastTimestampRef.current = now;
					} else {
						pinchActiveRef.current = false;
						setCursorState(false);
					}

					frameRef.current = requestAnimationFrame(detectFrame);
				};

				frameRef.current = requestAnimationFrame(detectFrame);
			} catch {
				setEnabled(false);
				setStatus("Camera unavailable or permission denied");
				stopDetection();
			}
		};

		if (enabled) {
			startDetection();
		} else {
			stopDetection();
			setStatus("Touchless scroll is off");
		}

		return () => {
			isCancelled = true;
			stopDetection();
		};
	}, [enabled]);

	return (
		<div className="touchless-panel">
			<div className="touchless-header">
				<span>Touchless Scroll</span>
				<label className="touchless-switch">
					<input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
					<span>{enabled ? "On" : "Off"}</span>
				</label>
			</div>

			<p className="touchless-status">{status}</p>

			<label className="touchless-sensitivity" htmlFor="touchless-sensitivity">
				Sensitivity
			</label>
			<input
				id="touchless-sensitivity"
				type="range"
				min="0.6"
				max="1.6"
				step="0.1"
				value={sensitivity}
				onChange={(event) => setSensitivity(Number(event.target.value))}
			/>

			<label className="touchless-switch">
				<input type="checkbox" checked={isMirrored} onChange={(event) => setIsMirrored(event.target.checked)} />
				<span>Mirror {isMirrored ? "On" : "Off"}</span>
			</label>

			<video ref={videoRef} className={`touchless-preview ${isMirrored ? "mirrored" : ""}`} playsInline muted />
			<p className="touchless-help">Swipe to scroll. Pinch thumb + index finger to click.</p>
			<div ref={cursorRef} className="touchless-cursor" />
		</div>
	);
}
