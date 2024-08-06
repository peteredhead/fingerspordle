import { Options } from "@mediapipe/holistic";

export const holisticOptions: Options = {
  enableFaceGeometry: false,
  modelComplexity: 0,
  refineFaceLandmarks: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
};
