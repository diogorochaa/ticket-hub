import Fastify from "fastify";
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";

import { registerModules } from "@/core/register-modules";
import { env } from "@/core/env";
import { prisma } from "@/infra/db/prisma/prisma";
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

await registerModules(app, {
    prisma,
    eventBus,
    mailer,
    passwordHasher,
    tokenService,
});

try {
    const address = await app.listen({ port: 3000 });
    console.log(`Server is running on ${address}`);
} catch (err) {
    console.error(err);
    process.exit(1);
}
