import React, { Component } from "react";
import ResultDisplay from "./ResultDisplay";
import {
  EMPTY_STRING_WARNING,
  NON_ALPHA_NUMERIC_STRING_WARNING,
  INPUT_AREA_PLACEHOLDER,
  DUPLICATES_LABEL,
} from "../constants/texts";
// import ClearInputIcon from "./ClearInputIcon";

function stringToOccurrence(input) {
  return input.split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

function isAlphaNumeric(string) {
  if (!string) {
    return false;
  }
  const letterNumberRegex = /^[0-9a-zA-Z]+$/;
  return string.match(letterNumberRegex);
}

export default class StringCheckerPad extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      warning: "",
      singleOccurence: "",
      occurrence: {},
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = async (e) => {
    const inputString = this.state.value;
    e.preventDefault();
    if (!this.isInputValid(inputString)) {
      return;
    }
    this.setState({ singleOccurence: stringToOccurrence(inputString) });
    const response = await fetch(`/stringCheckAPI/${inputString}`);
    const body = await response.text();

    this.setState({ occurrence: JSON.parse(body) });
  };

  clearInput = () => {
    //TODO: Make this working
    console.log("clearclear");
    this.setState({
      value: "",
      occurrence: "",
    });
  };

  isInputValid = (string) => {
    if (!string) {
      this.setState({
        warning: EMPTY_STRING_WARNING,
      });
      return false;
    } else if (!isAlphaNumeric(string)) {
      this.setState({
        warning: NON_ALPHA_NUMERIC_STRING_WARNING,
      });
      return false;
    }
    return true;
  };

  render() {
    return (
      <div className="string-checker-pad">
        <p className="warning">{this.state.warning}</p>
        <form className="string-checker-form" onSubmit={this.handleSubmit}>
          <input
            className="string-checker-input"
            type="text"
            placeholder={INPUT_AREA_PLACEHOLDER}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input
            disabled={!isAlphaNumeric(this.state.value)}
            className="string-checker-button"
            type="submit"
            value="Check"
          />
        </form>
        {/* <ClearInputIcon onClick={this.clearInput} /> */}

        <div>{DUPLICATES_LABEL}</div>
        <ResultDisplay results={this.state.singleOccurence} />
        <ResultDisplay results={this.state.occurrence} />
      </div>
    );
  }
}
