import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user";
import { IssueTokensService } from "@/modules/auth/application/services/issue-tokens.service";
import { LoginUseCase } from "@/modules/auth/application/use-cases/login";
import { LogoutUseCase } from "@/modules/auth/application/use-cases/logout";
import { RefreshUseCase } from "@/modules/auth/application/use-cases/refresh";
import { RegisterUseCase } from "@/modules/auth/application/use-cases/register";
import { PrismaRefreshTokenRepository } from "@/modules/auth/infra/prisma/prisma-refresh-token.repository";
import { LoginController } from "@/modules/auth/presentation/controllers/login.controller";
import { LogoutController } from "@/modules/auth/presentation/controllers/logout.controller";
import { RefreshController } from "@/modules/auth/presentation/controllers/refresh.controller";
import { RegisterController } from "@/modules/auth/presentation/controllers/register.controller";
import { registerAuthenticatePlugin } from "@/modules/auth/presentation/plugins/authenticate";
import { authRoutes } from "@/modules/auth/presentation/routes/auth.routes";
import { PrismaUserRepository } from "@/modules/users/infra/prisma/prisma-user.repository";

export async function registerAuthModule(
    app: FastifyInstance,
    deps: AppDeps,
) {
    const userRepository = new PrismaUserRepository(deps.prisma);
    const refreshTokenRepository = new PrismaRefreshTokenRepository(deps.prisma);

    const createUserUseCase = new CreateUserUseCase(
        userRepository,
        deps.passwordHasher,
        deps.eventBus,
    );

    const issueTokensService = new IssueTokensService(
        refreshTokenRepository,
        deps.tokenService,
    );

    await registerAuthenticatePlugin(app, deps.tokenService);

    await authRoutes(app, {
        register: new RegisterController(
            new RegisterUseCase(createUserUseCase, issueTokensService),
        ),
        login: new LoginController(
            new LoginUseCase(
                userRepository,
                deps.passwordHasher,
                issueTokensService,
            ),
        ),
        refresh: new RefreshController(
            new RefreshUseCase(
                refreshTokenRepository,
                deps.tokenService,
                userRepository,
                issueTokensService,
            ),
        ),
        logout: new LogoutController(
            new LogoutUseCase(refreshTokenRepository, deps.tokenService),
        ),
    });
}
