import type Redis from "ioredis";

import type { DistributedLock } from "@/shared/ports/distributed-lock";

export class RedisDistributedLock implements DistributedLock {
    constructor(private readonly redis: Redis) {}

    async acquire(key: string, ttlSeconds: number): Promise<boolean> {
        const result = await this.redis.set(key, "1", "EX", ttlSeconds, "NX");
        return result === "OK";
    }

    async release(key: string): Promise<void> {
        await this.redis.del(key);
    }
}
