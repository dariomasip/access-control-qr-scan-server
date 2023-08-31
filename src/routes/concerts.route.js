const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  addConcert,
  getConcert,
} = require("../controllers/concerts.controller");

router.get("/", verifyToken, getConcert);
router.post("/add", verifyToken, addConcert);

module.exports = router;
