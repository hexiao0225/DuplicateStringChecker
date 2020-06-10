import React from "react";
import {
  MAXIMUM_CHARACTER_WARNING,
  CHAR_COUNT_LABEL,
  MAXIMUM_CHARACTER,
} from "../constants/constants";

const CharCountText = ({ currentStringLength }) => (
  <p>
    {currentStringLength >= MAXIMUM_CHARACTER
      ? MAXIMUM_CHARACTER_WARNING
      : `${CHAR_COUNT_LABEL} ${currentStringLength}`}
  </p>
);

export default CharCountText;
