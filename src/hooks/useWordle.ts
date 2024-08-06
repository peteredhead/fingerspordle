import { useState } from "react";
import { LetterGuess } from "../types";
import { wordList } from "../data/wordlist";
import useAlert from "./useAlert";

const useWordle = () => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState<Array<string>>([]); // each guess is a string
  const [solution, setSolution] = useState<string>("");
  const { setMessage } = useAlert();

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray: Array<string | null> = solution.split("");
    let formattedGuess = currentGuess.split("").map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: Array<LetterGuess>) => {
    if (currentGuess === solution) {
      setMessage("Congratulations!!");
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  const submitGuess = () => {
    if (turn > 5) {
      setMessage("Sorry, you have no more guesses");
      return;
    }
    if (history.includes(currentGuess)) {
      setMessage("You have already guessed that word");
      setCurrentGuess("");
      return;
    }
    if (currentGuess.length !== 5) {
      setMessage("Guesses must be 5 letters");
      return;
    }
    if (!wordList.includes(currentGuess)) {
      setMessage("Not a valid word");
      setCurrentGuess("");
      return
    }
    const formatted = formatGuess();
    addNewGuess(formatted);
  };

  const deleteLetter = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
    return;
  };

  const addLetter = (letter: string) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    submitGuess,
    deleteLetter,
    addLetter,
    setSolution,
  };
};

export default useWordle;
