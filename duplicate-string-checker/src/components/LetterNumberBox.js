import React from "react";

const LetterNumberBox = ({ letter, number, isShrinkNeeded }) => (
  <div
    className={
      isShrinkNeeded ? "letter-number-box-shrinked" : "letter-number-box"
    }
  >
    <div>
      {/* <label>Character</label> */}
      {letter}
    </div>
    <div>
      {/* <label>Occurrence</label> */}
      {number}
    </div>
  </div>
);

export default LetterNumberBox;
