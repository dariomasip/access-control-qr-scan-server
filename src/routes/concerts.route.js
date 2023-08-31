const express = require("express");
const router = express.Router();

const {
  addConcert,
  getConcert,
} = require("../controllers/concerts.controller");

router.get("/", getConcert);
router.post("/add", addConcert);

module.exports = router;
