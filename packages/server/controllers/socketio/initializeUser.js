const redisClient = require("../../redis");
const parseFriendList = require("./parseFriendList");

const initializeUser = async socket => {
  socket.user = { ...socket.request.session.user };
  socket.join(socket.user.userid);
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid,
    "connected",
    true
  );
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  const parsedFriendList = await parseFriendList(friendList);
  const friendRooms = parsedFriendList.map(friend => friend.userid);

  if (friendRooms.length > 0)
    socket.to(friendRooms).emit("connected", true, socket.user.username);

  socket.emit("friends", parsedFriendList);

  const msgQuery = await redisClient.lrange(
    `chat:${socket.user.userid}`,
    0,
    -1
  );

  // to.from.content
  const messages = msgQuery.map(msgStr => {
    const parsedStr = msgStr.split(".");
    return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
  });

  if (messages && messages.length > 0) {
    socket.emit("messages", messages);
  }
};

module.exports = initializeUser;
