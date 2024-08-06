import { Landmark } from "./types";

export const normalise_data = (
  left_hand_landmarks: Array<Landmark> | undefined,
  right_hand_landmarks: Array<Landmark> | undefined
) => {
  const x: Array<number> = [];
  const y: Array<number> = [];
  const z: Array<number> = [];

  if (left_hand_landmarks) {
    left_hand_landmarks.forEach((landmark) => {
      x.push(landmark.x);
      y.push(landmark.y);
      z.push(landmark.z);
    });
  }

  if (right_hand_landmarks) {
    right_hand_landmarks.forEach((landmark) => {
      x.push(landmark.x);
      y.push(landmark.y);
      z.push(landmark.z);
    });
  }

  const x_min = Math.min(...x);
  const x_max = Math.max(...x);
  const x_range = x_max - x_min;

  const y_min = Math.min(...y);
  const y_max = Math.max(...y);
  const y_range = y_max - y_min;

  const z_min = Math.min(...z);
  const z_max = Math.max(...z);
  const z_range = z_max - z_min;

  const normalised_data: Array<number> = [];

  if (!left_hand_landmarks) {
    normalised_data.push(...new Array(21 * 3).fill(0));
  } else {
    left_hand_landmarks.forEach((landmark) => {
      const x_ = (landmark.x - x_min) / x_range;
      const y_ = (landmark.y - y_min) / y_range;
      const z_ = (landmark.z - z_min) / z_range;
      normalised_data.push(...[x_, y_, z_]);
    });
  }

  if (!right_hand_landmarks) {
    normalised_data.push(...new Array(21 * 3).fill(0));
  } else {
    right_hand_landmarks.forEach((landmark) => {
      const x_ = (landmark.x - x_min) / x_range;
      const y_ = (landmark.y - y_min) / y_range;
      const z_ = (landmark.z - z_min) / z_range;
      normalised_data.push(...[x_, y_, z_]);
    });
  }

  return normalised_data;
};
