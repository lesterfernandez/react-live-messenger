const redisClient = require("../../redis");

const dm = async (socket, message) => {
  message.from = socket.user.userid;
  // to.from.content
  const messageString = [message.to, message.from, message.content].join(
    "."
  );

  await redisClient.lpush(`chat:${message.to}`, messageString);
  await redisClient.lpush(`chat:${message.from}`, messageString);

  socket.to(message.to).emit("dm", message);
};

module.exports = dm;
