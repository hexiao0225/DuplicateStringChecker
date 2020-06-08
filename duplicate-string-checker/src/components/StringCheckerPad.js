import React, { Component } from "react";
import ResultDisplay from "./ResultDisplay";
import {
  EMPTY_STRING_WARNING,
  NON_ALPHA_NUMERIC_STRING_WARNING,
  INPUT_AREA_PLACEHOLDER,
  DUPLICATES_LABEL,
} from "../constants/texts";
// import ClearInputIcon from "./ClearInputIcon";
import axios from "axios";

//TODO: get this information from api
// const mockResults = {
//   A: 2,
//   B: 3,
// };

const mockResults = {
  A: 2,
  B: 3,
  C: 7,
  D: 20,
  E: 1334,
  1: 78,
  7: 5,
};

function isAlphaNumeric(string) {
  const letterNumberRegex = /^[0-9a-zA-Z]+$/;
  return string.match(letterNumberRegex);
}

export default class StringCheckerPad extends Component {
  constructor() {
    super();
    this.state = { value: "", warning: "", occurrence: {} };
  }
  refreshResultDisplay = (results) => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => res.json())
      .then((res) => this.setState({ occurrence: res.data }))
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    if (this.validateString(this.state.value)) {
      const data = this.state.value.json();
      axios
        .post("http://localhost:8000/api/todos/", data)
        .then((results) => this.refreshResultDisplay());

      //   this.setState({
      //     occurrence: mockResults,
      //   });
      e.preventDefault();
    }
  };

  clearInput = () => {
    //TODO: Make this working
    console.log("clearclear");
    this.setState({
      value: "",
      occurrence: "",
    });
  };

  validateString = (string) => {
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
            className="string-checker-button"
            type="submit"
            value="Check"
          />
        </form>
        {/* <ClearInputIcon onClick={this.clearInput} /> */}

        <div>{DUPLICATES_LABEL}</div>
        <ResultDisplay results={this.state.occurrence} />
      </div>
    );
  }
}
