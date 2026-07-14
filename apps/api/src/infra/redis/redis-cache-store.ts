import type Redis from "ioredis";

import type { CacheStore } from "@/shared/ports/cache-store";

export class RedisCacheStore implements CacheStore {
    constructor(private readonly redis: Redis) {}

    get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds && ttlSeconds > 0) {
            await this.redis.set(key, value, "EX", ttlSeconds);
            return;
        }

        await this.redis.set(key, value);
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    incr(key: string): Promise<number> {
        return this.redis.incr(key);
    }

    decr(key: string): Promise<number> {
        return this.redis.decr(key);
    }
}
