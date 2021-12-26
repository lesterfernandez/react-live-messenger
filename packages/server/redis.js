const Redis = require("ioredis");
require("dotenv").config();

const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis();

module.exports = redisClient;
