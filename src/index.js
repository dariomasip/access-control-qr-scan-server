require("./config/database");

const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1.0/concerts", require("./routes/concerts.route"));
app.use("/api/v1.0/codes", require("./routes/codes.route"));

// Settings
app.set("port", process.env.PORT || 3001);

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log(`Sever on port ${app.get("port")}`);
});
