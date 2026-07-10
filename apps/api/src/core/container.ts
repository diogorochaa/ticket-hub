import { PrismaUserRepository } from "../modules/users/infra/prisma/prisma-user.repository";
import { CreateUserController } from "../modules/users/presentation/controllers/create-user.controller";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user";
import { prisma } from "@/infra/db/prisma/prisma";

const userRepository =
    new PrismaUserRepository(prisma);

export const createUserController =
    new CreateUserController(new CreateUserUseCase(userRepository));