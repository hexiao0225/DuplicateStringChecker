import React from "react";
import {
  DESCRIPTION_LABEL,
  PROJECT_DESCRIPTION,
  FRONTEND_LABEL,
  FRONTEND_TECHNOLOGY,
  BACKEND_LABEL,
  BACKEND_TECHNOLOGY,
  TEST_CASES,
  TEST_STRINGS_LABEL,
} from "../constants/texts";

const InfoSidebar = () => (
  <div className="info-sidebar">
    <h2>{DESCRIPTION_LABEL}</h2>
    <h3>{PROJECT_DESCRIPTION}</h3>
    <h2>{FRONTEND_LABEL}</h2>
    <h3>{FRONTEND_TECHNOLOGY}</h3>
    <h2>{BACKEND_LABEL}</h2>
    <h3>{BACKEND_TECHNOLOGY}</h3>
    <h2>{TEST_STRINGS_LABEL}</h2>
    {TEST_CASES.map((string, index) => (
      <h3 key={index}>{string}</h3>
    ))}
  </div>
);

export default InfoSidebar;
