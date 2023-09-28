const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  addConcert,
  getConcert,
  getNextConcert,
  setUpdateAt,
  getUpdateAt,
} = require("../controllers/concerts.controller");

router.get("/", verifyToken, getConcert);
router.post("/add", verifyToken, addConcert);
router.get("/get-next", verifyToken, getNextConcert);
router.get("/update-at/:concert", verifyToken, getUpdateAt);
router.post("/update-at/:concert", verifyToken, setUpdateAt);

module.exports = router;
