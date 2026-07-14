import Redis from "ioredis";

import { env } from "@/core/env";

export function createRedisClient(): Redis {
    return new Redis(env.redisUrl, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
    });
}
