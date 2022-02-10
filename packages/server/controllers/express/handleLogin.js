const { jwtVerify, getJwt } = require("../jwt/jwtAuth");
const pool = require("../../db");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const token = getJwt(req);

  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  jwtVerify(token, process.env.JWT_SECRET)
    .then(async decoded => {
      const potentialUser = await pool.query(
        "SELECT username FROM users u WHERE u.username = $1",
        [decoded.username]
      );

      if (potentialUser.rowCount === 0) {
        res.json({ loggedIn: false, token: null });
        return;
      }

      res.json({ loggedIn: true, token });
    })
    .catch(() => {
      res.json({ loggedIn: false });
    });
};

module.exports = handleLogin;
