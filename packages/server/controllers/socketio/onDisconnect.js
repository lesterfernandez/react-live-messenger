const redisClient = require("../../redis");
const parseFriendList = require("./parseFriendList");

const onDisconnect = async socket => {
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "connected",
    false
  );
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  const friendRooms = await parseFriendList(friendList).then(friends =>
    friends.map(friend => friend.userid)
  );
  socket.to(friendRooms).emit("connected", false, socket.user.username);
};

module.exports = onDisconnect;
