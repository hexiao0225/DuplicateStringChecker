var express = require("express");
var router = express.Router();

function findDuplicates(string) {
  let record = {};
  let result = {};
  for (let i = 0; i < string.length; i++) {
    for (let j = i + 1; j < string.length + 1; j++) {
      const substring = string.slice(i, j);
      if (record[substring]) {
        record[substring] += 1;
      } else {
        record[substring] = 1;
      }
    }
  }
  for (let key in record) {
    if (record[key] > 1) {
      result[key] = record[key];
    }
  }
  return result;
}

router.get("/:string", (request, response) => {
  let input = request.params.string;
  const results = findDuplicates(input);
  return response.send(results);
});

module.exports = router;
