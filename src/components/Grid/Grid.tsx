import React from "react";
import Row from "../Row";
import { LetterGuess } from "../../types";

interface Props {
  guesses: Array<Array<LetterGuess>>;
  currentGuess: string;
  turn: number;
}

export default function Grid({ guesses, currentGuess, turn }: Readonly<Props>) {
  return (
    <div>
      {guesses.map((guess, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
}
