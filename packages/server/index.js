const express = require("express");
const {
  sessionMiddleware,
  wrap,
  corsConfig,
} = require("./controllers/serverController");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const {
  initializeUser,
  addFriend,
  onDisconnect,
  authorizeUser,
  dm,
} = require("./controllers/socketController");
const pool = require("./db");
const redisClient = require("./redis");
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", authRouter);
app.set("trust proxy", 1);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser);
io.on("connect", socket => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("dm", message => dm(socket, message));

  socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port " + (process.env.PORT || "4000"));
});

const resetEverythingInterval = 1000 * 60 * 5; // five minutes
setInterval(() => {
  pool.query("DELETE FROM users u where u.username != $1", ["lester"]);
  redisClient.flushall();
}, resetEverythingInterval);
