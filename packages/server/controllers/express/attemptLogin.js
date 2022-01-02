const pool = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSign } = require("../jwt/jwtAuth");
require("dotenv").config();

const attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT id, username, passhash, userid FROM users u WHERE u.username=$1",
    [req.body.username]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      jwtSign(
        {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
          userid: potentialLogin.rows[0].userid,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      )
        .then(token => {
          res.json({ loggedIn: true, token });
        })
        .catch(err => {
          console.log(err);
          res.json({ loggedIn: false, status: "Try again later" });
        });
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
      console.log("wrong pass");
    }
  } else {
    console.log("not good");
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
};

module.exports = attemptLogin;
