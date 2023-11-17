const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  getConcert,
  getNextConcert,
  setUpdateAt,
  getUpdateAt,
  createConcert,
} = require("../controllers/concerts.controller");

router.get("/", verifyToken, getConcert);
router.post("/create", verifyToken, createConcert);
router.get("/get-next", verifyToken, getNextConcert);
router.get("/update-at/:concert", verifyToken, getUpdateAt);
router.post("/update-at/:concert", verifyToken, setUpdateAt);

module.exports = router;
