const pool = require("../../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { jwtSign } = require("../jwt/jwtAuth");

const attemptRegister = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash, userid) values($1,$2,$3) RETURNING id, username, userid",
      [req.body.username, hashedPass, uuidv4()]
    );

    jwtSign(
      {
        username: req.body.username,
        id: newUserQuery.rows[0].id,
        userid: newUserQuery.rows[0].userid,
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
    res.json({ loggedIn: false, status: "Username taken" });
  }
};

module.exports = attemptRegister;
