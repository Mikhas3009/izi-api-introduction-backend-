import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: 6379,
    // password: "если задан пароль",
    // db: 0, // можно указать номер базы
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});
