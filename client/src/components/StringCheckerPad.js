import React, { Component } from "react";
import ResultDisplay from "./ResultDisplay";
import {
  INPUT_AREA_PLACEHOLDER,
  DUPLICATES_LABEL,
  NON_ALPHANUMERIC_FORMAT_MESSAGE,
  MAXIMUM_CHARACTER,
  BACKEND_LABEL,
  FRONTEND_LABEL,
  TITLE,
  PROJECT_DESCRIPTION,
  TOP_BOTTOM_LABEL,
} from "../constants/texts";

function stringToOccurrence(input) {
  let result = {};
  const record = input.split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  for (let key in record) {
    if (record[key] > 1) {
      result[key] = record[key];
    }
  }
  return result;
}

function isAlphaNumeric(string) {
  const letterNumberRegex = /^[0-9a-zA-Z]+$/;
  return string.match(letterNumberRegex);
}

function removeNonAlphanumericChar(string) {
  return string.replace(/[^A-Za-z0-9]/g, "");
}

function sanitizeInput(string) {
  return string.slice(0, MAXIMUM_CHARACTER).replace(/[^A-Za-z0-9]/g, "");
}

export default class StringCheckerPad extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      warning: "",
      singleOccurence: {},
      occurrence: {},
      dismissWarning: false,
      isLoading: false,
      error: false,
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    const inputString = sanitizeInput(this.state.value);
    e.preventDefault();
    if (!inputString || !isAlphaNumeric(inputString)) {
      return;
    }
    this.setState({ singleOccurence: stringToOccurrence(inputString) });
    this.setState({ isLoading: true });
    fetch(`/stringCheckAPI/${inputString}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          occurrence: json,
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
      singleOccurence,
      occurrence,
      isLoading,
      error,
      dismissWarning,
    } = this.state;
    return (
      <div className="string-checker-pad">
        <h1>{TITLE}</h1>
        <form className="string-checker-form" onSubmit={this.handleSubmit}>
          <input
            className="string-checker-input"
            autoFocus
            type="search"
            placeholder={INPUT_AREA_PLACEHOLDER}
            value={value}
            onChange={this.handleChange}
          />
          <button
            disabled={!isAlphaNumeric(value)}
            className="string-checker-button"
            type="submit"
          >
            Check
          </button>
        </form>
        <p>
          {Math.min(value.length, MAXIMUM_CHARACTER)}/{MAXIMUM_CHARACTER}
        </p>
        {value && !isAlphaNumeric(value) && !dismissWarning && (
          <p className="warning">
            {NON_ALPHANUMERIC_FORMAT_MESSAGE} {"   "}
            <a
              onClick={() =>
                this.setState({
                  value: removeNonAlphanumericChar(value),
                })
              }
            >
              Yes
            </a>
            {"   "}
            <a>No</a>
          </p>
        )}

        {singleOccurence ? (
          <div>
            <h2>{DUPLICATES_LABEL}</h2>
            <p>{TOP_BOTTOM_LABEL}</p>
            <h3>{FRONTEND_LABEL}</h3>
            <ResultDisplay results={singleOccurence} />
          </div>
        ) : null}
        {isLoading && !error && !occurrence.length ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h3>{BACKEND_LABEL}</h3>
            <ResultDisplay results={occurrence} />
          </div>
        )}
        {error && <p>Something went wrong</p>}
      </div>
    );
  }
}
