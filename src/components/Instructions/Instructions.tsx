import React, { useState } from "react";
import "./Instructions.css";

function Instructions() {
  const [visible, setVisible] = useState(false);

  const handleShowClick = () => setVisible(true);

  const handleCloseClick = () => setVisible(false);

  return (
    <>
      <button className="instructions__button" onClick={handleShowClick}>
        ?
      </button>
      {visible ? (
        <div className="instructions__modal-wrapper">
          <div className="instructions__modal">
            <h3>Welcome to Finger Spordle</h3>
            <p>
              The same rules as Wordle, but enter your guesses using NZSL finger
              spelling
            </p>
            <hr />
            <p>Sign FINISH to enter your guess</p>
            <img
              src="/images/finish.png"
              className="instructions__image"
              alt="Finish sign"
            />
            <p>Sign ERASE to delete a letter</p>
            <img
              src="/images/erase.png"
              className="instructions__image"
              alt="Erase sign"
            />
            <p>
              <b>Note:</b> currently the letter J is unsupported (due to the
              dynamic nature of the sign). Don't worry, none of the words you
              need to guess will include "J"
            </p>

            <button
              className="instructions__play-button"
              onClick={handleCloseClick}
            >
              Play
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Instructions;
