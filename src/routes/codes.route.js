const express = require("express");
const router = express.Router();

const {
  getValidCodes,
  getRecordsCodes,
  addRecordCode,
  deleteAndLoadCodes,
} = require("../controllers/codes.controller");

router.get("/valid/:conciert", getValidCodes);
router.get("/registration/:conciert", getRecordsCodes);
router.post("/add-record/:conciert", addRecordCode);
router.post("/delete-load-codes", deleteAndLoadCodes);

module.exports = router;
