import redisClient from "../config/redis.js";

export const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = async (key, value, expiry = 3600) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: expiry,
  });
};
