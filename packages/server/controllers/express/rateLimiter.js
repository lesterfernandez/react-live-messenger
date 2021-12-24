const redisClient = require("../../redis");

const rateLimiter =
  (secondsLimit, limitAmount) => async (req, res, next) => {
    const ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    [response] = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, secondsLimit)
      .exec();

    if (response[1] > limitAmount)
      res.json({
        loggedIn: false,
        status: "Slow down!! Try again in a minute.",
      });
    else next();
  };

module.exports = rateLimiter;
