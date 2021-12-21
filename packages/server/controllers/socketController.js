const authorizeUser = require("./socketio/authorizeUser");
const initializeUser = require("./socketio/initializeUser");
const addFriend = require("./socketio/addFriend");
const onDisconnect = require("./socketio/onDisconnect");
const dm = require("./socketio/dm");

module.exports = {
  addFriend,
  authorizeUser,
  initializeUser,
  onDisconnect,
  dm,
};
