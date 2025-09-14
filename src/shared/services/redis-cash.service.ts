import { redisClient } from "../../infrastructure/config/redis.config";
import { CacheInterface } from "../interfaces/cashe.interface";

export class RedisCacheService<T> implements CacheInterface<T> {
    private readonly defaultTtl = 60;

    async saveToCache(key: string, value: T, ttl: number = this.defaultTtl): Promise<void> {
        try {
            const serialized = JSON.stringify(value);
            await redisClient.set(key, serialized, "EX", ttl);
        } catch (err) {
            console.error(`[Redis] ошибка сохранения для ключа ${key}:`, err);     
        }
    }

    async getFromCache(key: string): Promise<T | null> {
        try {
            const data = await redisClient.get(key);
            return data ? (JSON.parse(data) as T) : null;
        } catch (err) {
            console.error(`[Redis] ошибка получения для ключа ${key}:`, err);
            return null; 
        }
    }

    async deleteFromCache(key: string): Promise<void> {
        try {
            await redisClient.del(key);
        } catch (err) {
            console.error(`[Redis] ошибка удаления для ключа ${key}:`, err);
        }
    }
}
