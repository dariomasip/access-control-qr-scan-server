require("./config/database");

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

// Socket IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  const connectedSocketsCount = io.sockets.sockets.size;
  console.log(`Cantidad de sockets conectados: ${connectedSocketsCount}`);

  socket.on("record_code", () => {
    socket.broadcast.emit("fetch_data", "Otro usuario escaneó un código.");
  });

  // Maneja la desconexión del usuario
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
    // Obtén la cantidad de sockets conectados
    const connectedSocketsCount = io.sockets.sockets.size;
    console.log(`Cantidad de sockets conectados: ${connectedSocketsCount}`);
  });
});

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

server.listen(app.get("port"), () => {
  console.log(`Sever on port ${app.get("port")}`);
});
