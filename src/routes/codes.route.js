const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  getValidCodes,
  getRecordsCodes,
  addRecordCode,
  deleteAndLoadCodes,
} = require("../controllers/codes.controller");

router.get("/validation/:concert", verifyToken, getValidCodes);
router.get("/registration/:concert", verifyToken, getRecordsCodes);
router.post("/add-record/:concert", verifyToken, addRecordCode);
router.post("/delete-load-codes/:concert", verifyToken, deleteAndLoadCodes);

module.exports = router;
