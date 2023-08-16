const express = require("express");
const router = express.Router();

const {
  addConcert,
  getConcert,
  addRecordCode,
  deleteAndLoadCodes,
} = require("../controllers/concerts.controller");

router.get("/", getConcert);
router.post("/recordcode/:concert", addRecordCode);
router.post("/add", addConcert);
router.post("/delete-load-codes", deleteAndLoadCodes);

module.exports = router;
