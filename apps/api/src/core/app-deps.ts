import type { prisma } from "@/infra/db/prisma/prisma";
import type { EventBus } from "@/shared/events/event-bus";
import type { Mailer } from "@/modules/notifications/application/ports/mailer";
import type { PasswordHasher } from "@/modules/users/application/ports/password-hasher";
import type { TokenService } from "@/modules/auth/application/ports/token-service";

export type AppDeps = {
    prisma: typeof prisma;
    eventBus: EventBus;
    mailer: Mailer;
    passwordHasher: PasswordHasher;
    tokenService: TokenService;
};
