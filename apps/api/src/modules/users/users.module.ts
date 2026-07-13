import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user";
import { DeleteUserUseCase } from "@/modules/users/application/use-cases/delete-user";
import { GetUserByEmailUseCase } from "@/modules/users/application/use-cases/get-user-by-email";
import { GetUserByIdUseCase } from "@/modules/users/application/use-cases/get-user-by-id";
import { UpdateUserUseCase } from "@/modules/users/application/use-cases/update-user";
import { PrismaUserRepository } from "@/modules/users/infra/prisma/prisma-user.repository";
import { CreateUserController } from "@/modules/users/presentation/controllers/create-user.controller";
import { DeleteUserController } from "@/modules/users/presentation/controllers/delete-user.controller";
import { GetUserByEmailController } from "@/modules/users/presentation/controllers/get-user-by-email.controller";
import { GetUserByIdController } from "@/modules/users/presentation/controllers/get-user-by-id.controller";
import { UpdateUserController } from "@/modules/users/presentation/controllers/update-user.controller";
import { userRoutes } from "@/modules/users/presentation/routes/user.routes";

export async function registerUsersModule(
    app: FastifyInstance,
    deps: AppDeps,
) {
    const userRepository = new PrismaUserRepository(deps.prisma);

    const createUserUseCase = new CreateUserUseCase(
        userRepository,
        deps.passwordHasher,
        deps.eventBus,
    );

    await userRoutes(app, {
        createUser: new CreateUserController(createUserUseCase),
        getUserByEmail: new GetUserByEmailController(
            new GetUserByEmailUseCase(userRepository),
        ),
        getUserById: new GetUserByIdController(
            new GetUserByIdUseCase(userRepository),
        ),
        updateUser: new UpdateUserController(
            new UpdateUserUseCase(userRepository, deps.passwordHasher),
        ),
        deleteUser: new DeleteUserController(
            new DeleteUserUseCase(userRepository),
        ),
    });
}
