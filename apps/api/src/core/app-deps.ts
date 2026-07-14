import type { prisma } from "@/infra/db/prisma/prisma";
import type { TokenService } from "@/modules/auth/application/ports/token-service";
import type { Mailer } from "@/modules/notifications/application/ports/mailer";
import type { PasswordHasher } from "@/modules/users/application/ports/password-hasher";
import type { EventBus } from "@/shared/events/event-bus";
import type { CacheStore } from "@/shared/ports/cache-store";
import type { DistributedLock } from "@/shared/ports/distributed-lock";
import type { MessageBus } from "@/shared/ports/message-bus";

export type AppDeps = {
    prisma: typeof prisma;
    eventBus: EventBus;
    mailer: Mailer;
    passwordHasher: PasswordHasher;
    tokenService: TokenService;
    cache: CacheStore;
    lock: DistributedLock;
    messageBus: MessageBus;
};
