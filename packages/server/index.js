const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hi");
});

io.on("connect", socket => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
