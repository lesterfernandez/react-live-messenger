const redisClient = require("../../redis");
const addFriend = require("./addFriend");
const parseFriendList = require("./parseFriendList");

const initializeUser = async socket => {
  socket.join(socket.user.userid);
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid,
    "connected",
    true
  );

  // always have lester as a friend
  // this is because this project serves as a demo
  // therefore I want people to be able to test it out quickly
  await addFriend(socket, "lester", () => {});

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
