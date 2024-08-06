import React from "react";
import { LetterGuess } from "../../types";
import "./Row.css";

interface Props {
  guess?: Array<LetterGuess>;
  currentGuess?: string;
}

const WORD_LENGTH = 5;

export default function Row({ guess, currentGuess }: Readonly<Props>) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, index) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((letter, index) => (
          <div key={index} className="filled">
            {letter}
          </div>
        ))}
        {new Array(WORD_LENGTH - letters.length).fill(0).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {new Array(WORD_LENGTH).fill(0).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}
