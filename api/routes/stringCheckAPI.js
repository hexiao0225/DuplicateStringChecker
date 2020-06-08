var express = require("express");
var router = express.Router();

function stringToOccurrence(input) {
  return input.split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

router.post("/", (req, res) => {
  const body = req.body.post;
  const results = stringToOccurrence(body);
  //TODO: calculation here
  return res.send(results);
});

module.exports = router;
