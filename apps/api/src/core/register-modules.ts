import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { registerUsersModule } from "@/modules/users/users.module";

export async function registerModules(
    app: FastifyInstance,
    deps: AppDeps,
) {
    await registerUsersModule(app, deps);
}
