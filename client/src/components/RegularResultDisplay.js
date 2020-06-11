import React from "react";
import LetterNumberBox from "./LetterNumberBox";
import { NO_DUPLICATES_FOUND } from "../constants/constants";

const RegularResultDisplay = ({ results } = {}) => {
  const patternList = Object.keys(results).sort();
  return (
    <div className="result-display">
      {!patternList.length ? <p>{NO_DUPLICATES_FOUND}</p> : null}
      {patternList.map((char, index) => (
        <LetterNumberBox key={index} letter={char} number={results[char]} />
      ))}
    </div>
  );
};

export default RegularResultDisplay;
