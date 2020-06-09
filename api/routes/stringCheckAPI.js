var express = require("express");
var router = express.Router();

function stringToOccurrence(input) {
  const countMap = input.split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(countMap);
}

router.get("/:string", (request, response) => {
  var input = request.params.string;
  const results = stringToOccurrence(input);
  return response.send(results);
});

module.exports = router;
