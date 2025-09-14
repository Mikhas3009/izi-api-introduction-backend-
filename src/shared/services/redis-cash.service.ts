import { redisClient } from "../../infrastructure/config/redis.config";
import { CacheInterface } from "../interfaces/cashe.interface";

export class RedisCashService<T> implements CacheInterface<T> {
    private readonly DEFAULT_TTL = 60;

    async saveToCache(key: string, value: T, ttl: number = this.DEFAULT_TTL): Promise<void> {
        const serialized = JSON.stringify(value);
        redisClient.set(key, serialized, "EX", ttl).catch(() => {
            throw new Error("Redis set error");
        });
    }

    async getFromCache(key: string): Promise<T | null> {
        const data = await redisClient.get(key).catch(() => {
            throw new Error("Redis get error");
        });
        return data ? (JSON.parse(data) as T) : null;
    }

    async deleteFromCache(key: string): Promise<void> {
        redisClient.del(key).catch((err) => {
            throw new Error("Redis delete error");
        });
    }
}
