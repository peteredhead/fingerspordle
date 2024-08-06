import { Camera } from "@mediapipe/camera_utils";
import { Holistic } from "@mediapipe/holistic";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef, useState } from "react";
import { Landmark } from "./types";
import { normalise_data } from "./utils";
import { holisticOptions } from "./settings";
import Grid from "./components/Grid";
import { labels } from "./data/labels";
import { testWordList } from "./data/wordlist";
import useWordle from "./hooks/useWordle";

type DetectionResult = {
  leftHandLandmarks?: Array<Landmark>;
  rightHandLandmarks?: Array<Landmark>;
};

function Game() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentSigns, setCurrentSigns] = useState<Array<string>>(["", ""]);
  const [lastSign, setLastSign] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  const {
    currentGuess,
    guesses,
    turn,
    addLetter,
    deleteLetter,
    submitGuess,
    setSolution,
  } = useWordle();

  const holistic = new Holistic({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    },
  });
  holistic.setOptions(holisticOptions);

  const onResults = async ({
    leftHandLandmarks,
    rightHandLandmarks,
  }: DetectionResult) => {
    if (!isReady) {
      setIsReady(true);
    }
    if (!leftHandLandmarks && !rightHandLandmarks) {
      return;
    }
    const data = normalise_data(leftHandLandmarks, rightHandLandmarks);
    if (model.current) {
      const input = tf.expandDims(tf.tensor(data, [126, 1], "float32"));

      // @ts-ignore
      const result: Array<number> = await model.current.predict(input).data();

      const confidence = Math.max(...result);

      if (confidence < 0.99) {
        console.log(` rejecting ${confidence}`);
        return;
      }

      const topIndex = result.indexOf(confidence);

      const sign = labels[topIndex];

      // setCurrentSigns((prev) => {
      //   const _prev = [...prev];
      //   _prev.shift();
      //   _prev.push(sign);
      //   return _prev;
      // });
      setCurrentSigns([sign]);

      console.log(`${labels[topIndex]} (${result[topIndex]})`);
    }
  };

  useEffect(() => {
    setSolution(testWordList[Math.floor(Math.random() * testWordList.length)]);
  }, []);

  useEffect(() => {
    // if (currentSigns[0] !== currentSigns[1]) {
    //   return;
    // }
    const currentSign = currentSigns[0];
    if (currentSign === lastSign) {
      return;
    }

    setLastSign(currentSign);

    if (currentSign === "None") {
      return;
    }

    if (currentSign === "finish") {
      submitGuess();
    } else if (currentSign === "erase") {
      deleteLetter();
    } else if (currentSign?.startsWith("letter_")) {
      const letter = currentSign.replace("letter_", "");
      addLetter(letter);
    }
  }, [JSON.stringify(currentSigns)]);

  holistic.onResults(onResults);

  useEffect(() => {
    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          // @ts-ignore
          await holistic.send({ image: videoRef.current });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, []);

  const model = useRef<tf.LayersModel>();

  const kbdInput = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === "Enter") {
      setCurrentSigns(["finish", "finish"]);
    } else if (key === "/") {
      deleteLetter();
    } else if (key.length === 1) {
      setCurrentSigns([`letter_${key}`]);
      // setCurrentSigns([`letter_${key}`, `letter_${key}`]);
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", kbdInput);
    return () => {
      window.removeEventListener("keypress", kbdInput);
    };
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      model.current = await tf.loadLayersModel("/model/model.json");
    };
    loadModel();
  }, []);

  return (
    <div className="wrapper">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      {!isReady ? <p> Loading... </p> : null}
      <video
        ref={videoRef}
        className="video"
        style={{ opacity: !isReady ? 0.1 : 1 }}
      ></video>
    </div>
  );
}

export default Game;
