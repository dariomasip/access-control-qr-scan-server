const express = require("express");
const router = express.Router();

const {
  getValidCodes,
  getRecordsCodes,
  addRecordCode,
  deleteAndLoadCodes,
} = require("../controllers/codes.controller");

router.get("/valid/:concert", getValidCodes);
router.get("/registration/:concert", getRecordsCodes);
router.post("/add-record/:concert", addRecordCode);
router.post("/delete-load-codes/:concert", deleteAndLoadCodes);

module.exports = router;
