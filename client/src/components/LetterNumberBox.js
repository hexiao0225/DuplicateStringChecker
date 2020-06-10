import React from "react";

const LetterNumberBox = ({ letter, number, isShrinkNeeded }) => (
  <li className="letter-number-box">
    <div className="letter-number-box-character">{letter}</div>
    <div className="letter-number-box-occurrence">{number}</div>
  </li>
);

export default LetterNumberBox;
