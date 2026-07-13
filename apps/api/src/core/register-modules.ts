import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { registerAuthModule } from "@/modules/auth/auth.module";
import { registerNotificationsModule } from "@/modules/notifications/notifications.module";
import { registerUsersModule } from "@/modules/users/users.module";

export async function registerModules(
    app: FastifyInstance,
    deps: AppDeps,
) {
    registerNotificationsModule(deps.eventBus, deps.mailer);
    await registerUsersModule(app, deps);
    await registerAuthModule(app, deps);
}
