import type { FastifyInstance } from "fastify";

import type { LoginController } from "../controllers/login.controller";
import type { LogoutController } from "../controllers/logout.controller";
import type { RefreshController } from "../controllers/refresh.controller";
import type { RegisterController } from "../controllers/register.controller";
import { loginSchema } from "../schemas/login.schema";
import { logoutSchema } from "../schemas/logout.schema";
import { refreshSchema } from "../schemas/refresh.schema";
import { registerSchema } from "../schemas/register.schema";

export type AuthControllers = {
    register: RegisterController;
    login: LoginController;
    refresh: RefreshController;
    logout: LogoutController;
};

export async function authRoutes(
    app: FastifyInstance,
    controllers: AuthControllers,
) {
    app.post(
        "/auth/register",
        { schema: { body: registerSchema } },
        controllers.register.handle,
    );

    app.post(
        "/auth/login",
        { schema: { body: loginSchema } },
        controllers.login.handle,
    );

    app.post(
        "/auth/refresh",
        { schema: { body: refreshSchema } },
        controllers.refresh.handle,
    );

    app.post(
        "/auth/logout",
        { schema: { body: logoutSchema } },
        controllers.logout.handle,
    );
}
