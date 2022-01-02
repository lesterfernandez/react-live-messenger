const { jwtVerify } = require("../jwt/jwtAuth");
require("dotenv").config();

const authorizeUser = (socket, next) => {
  const token = socket.handshake.auth.token;

  jwtVerify(token, process.env.JWT_SECRET)
    .then(decoded => {
      socket.user = { ...decoded };
      next();
    })
    .catch(err => {
      console.log("Bad request!", err);
      next(new Error("Not authorized"));
    });
};

module.exports = authorizeUser;
