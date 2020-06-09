import React from "react";
import LetterNumberBox from "./LetterNumberBox";

const isShrinkedBoxNeeded = (results) => {
  return Object.keys(results).length >= 5;
};

const ResultDisplay = ({ results }) => (
  <div className="result-display">
    {console.log(results) ||
      Object.keys(results).map((result, index) => (
        <LetterNumberBox
          key={index}
          letter={result}
          number={results[result]} //TODO: cleaner way
          isShrinkNeeded={isShrinkedBoxNeeded(results)}
        />
      ))}
  </div>
);

export default ResultDisplay;
