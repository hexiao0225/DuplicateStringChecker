import React from "react";
import LetterNumberBox from "./LetterNumberBox";

const isShrinkedBoxNeeded = (results) => {
  return Object.keys(results).length >= 5;
};

const ResultDisplay = ({ results }) => (
  <div className="result-display">
    {Object.keys(results).map((char, index) => (
      <LetterNumberBox
        key={index}
        letter={char}
        number={results[char]}
        isShrinkNeeded={isShrinkedBoxNeeded(results)}
      />
    ))}
  </div>
);

export default ResultDisplay;
