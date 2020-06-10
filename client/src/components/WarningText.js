import React from "react";
import { NON_ALPHANUMERIC_FORMAT_MESSAGE } from "../constants/constants";

const WarningText = ({ dismissWarning, sanitizeString }) => (
  <p className="warning">
    {NON_ALPHANUMERIC_FORMAT_MESSAGE} {"   "}
    <a onClick={() => sanitizeString()}>Yes</a>
    {"   "}
    <a onClick={() => dismissWarning()}>No</a>
  </p>
);

export default WarningText;
