import { MAXIMUM_CHARACTER } from "../constants/constants";

export const stringToOccurrence = (string) => {
  let result = {};
  const record = string.split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
  for (let key in record) {
    if (record[key] > 1) {
      result[key] = record[key];
    }
  }
  return result;
};

export const isAlphaNumeric = (string) => {
  const letterNumberRegex = /^[0-9a-zA-Z]+$/;
  return string.match(letterNumberRegex);
};

export const sanitizeString = (string) => {
  return string.slice(0, MAXIMUM_CHARACTER).replace(/[^A-Za-z0-9]/g, "");
};

export const isStringValid = (string) => {
  return string && string.length && isAlphaNumeric(string);
};
