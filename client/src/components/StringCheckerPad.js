import React, { Component } from "react";
import RegularResultDisplay from "./RegularResultDisplay";
import ResultCanvas from "./ResultCanvas";
import {
  INPUT_AREA_PLACEHOLDER,
  BACKEND_RESULT_LABEL,
  TITLE,
  DUPLICATES_LABEL,
  TOP_BOTTOM_LABEL,
  FRONTEND_RESULT_LABEL,
  LOADING,
  ERROR_MSG,
  USE_CANVAS_THRESHOLD,
} from "../constants/constants";

import {
  stringToOccurrence,
  isAlphaNumeric,
  sanitizeString,
  isStringValid,
} from "../utils/helpers";
import WarningText from "./WarningText";
import CharCountText from "./CharCountText";

export default class StringCheckerPad extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      frontendResults: null,
      backendResults: null,
      isWarningDismissed: false,
      isLoading: false,
      error: false,
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value, isWarningDismissed: false });
  };

  handleSubmit = (e) => {
    const string = sanitizeString(this.state.value);
    e.preventDefault();
    if (!isStringValid(string)) {
      return;
    }
    this.setState({
      frontendResults: stringToOccurrence(string),
      isLoading: true,
    });

    fetch(`/stringCheckAPI/${string}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          backendResults: json,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ error: true, isLoading: false });
        console.log(error);
      });
  };

  render() {
    const {
      value,
      frontendResults,
      backendResults,
      isLoading,
      error,
      isWarningDismissed,
    } = this.state;

    return (
      <div className="string-checker-pad">
        <h1>{TITLE}</h1>
        <form className="string-checker-form" onSubmit={this.handleSubmit}>
          <input
            className="string-checker-input"
            autoFocus
            type="search" // "search" enables clear button at the end
            placeholder={INPUT_AREA_PLACEHOLDER}
            value={value}
            onChange={this.handleChange}
          />
          <button
            disabled={!isStringValid(value)}
            className="string-checker-button"
            type="submit"
          >
            Check
          </button>
        </form>

        {value && !isAlphaNumeric(value) && !isWarningDismissed ? (
          <WarningText
            dismissWarning={() => {
              this.setState({ isWarningDismissed: true });
            }}
            sanitizeString={() => {
              this.setState({
                value: sanitizeString(value),
              });
            }}
          />
        ) : (
          <CharCountText currentStringLength={value.length} />
        )}

        <h2>{DUPLICATES_LABEL}</h2>
        <p>{TOP_BOTTOM_LABEL}</p>

        {frontendResults ? (
          <div>
            <h3>{FRONTEND_RESULT_LABEL}</h3>
            <RegularResultDisplay results={frontendResults} />
          </div>
        ) : null}

        {backendResults ? (
          <div>
            <h3>{BACKEND_RESULT_LABEL}</h3>
            {/* To avoid lag, canvas is used to render large datasets */}
            {Object.keys(backendResults).length > USE_CANVAS_THRESHOLD ? (
              <ResultCanvas results={backendResults} />
            ) : (
              <RegularResultDisplay results={backendResults} />
            )}
          </div>
        ) : null}

        {isLoading ? <p>{LOADING}</p> : null}
        {error && <p>{ERROR_MSG}</p>}
      </div>
    );
  }
}
