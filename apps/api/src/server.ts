import Fastify from "fastify";
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";

import { registerModules } from "@/core/register-modules";
import { env } from "@/core/env";
import { prisma } from "@/infra/db/prisma/prisma";
import { RabbitMqMessageBus } from "@/infra/rabbitmq/rabbitmq-message-bus";
import { createRedisClient } from "@/infra/redis/redis-client";
import { RedisCacheStore } from "@/infra/redis/redis-cache-store";
import { RedisDistributedLock } from "@/infra/redis/redis-distributed-lock";
import { JwtTokenService } from "@/modules/auth/infra/jwt/jwt-token.service";
import { SmtpMailer } from "@/modules/notifications/infra/smtp/smtp-mailer";
import { BcryptPasswordHasher } from "@/modules/users/infra/crypto/bcrypt-password-hasher";
import { EventBus } from "@/shared/events/event-bus";

const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const eventBus = new EventBus();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService({
    secret: env.jwtSecret,
    accessTokenTtlSeconds: env.accessTokenTtlSeconds,
    refreshTokenTtlDays: env.refreshTokenTtlDays,
});
const mailer = new SmtpMailer({
    host: env.smtpHost,
    port: env.smtpPort,
    from: env.mailFrom,
});

const redis = createRedisClient();
await redis.connect();

const cache = new RedisCacheStore(redis);
const lock = new RedisDistributedLock(redis);

const messageBus = new RabbitMqMessageBus(env.rabbitmqUrl);
await messageBus.connect();

await registerModules(app, {
    prisma,
    eventBus,
    mailer,
    passwordHasher,
    tokenService,
    cache,
    lock,
    messageBus,
});

const shutdown = async () => {
    await app.close();
    await messageBus.close();
    redis.disconnect();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

try {
    const address = await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log(`Server is running on ${address}`);
} catch (err) {
    console.error(err);
    process.exit(1);
}
