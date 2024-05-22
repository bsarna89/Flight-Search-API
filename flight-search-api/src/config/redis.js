import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) =>
  logger.error("Redis connection error: %o", err)
);

await redisClient.connect();

export default redisClient;
