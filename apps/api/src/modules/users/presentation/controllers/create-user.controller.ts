import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserRequest } from "../schemas/create-user.schema";
import { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user";
import { UserAlreadyExistsError } from "@/modules/users/domain/errors/user-already-exists.error";
import { InvalidEmailError } from "@/modules/users/domain/errors/invalid-email.error";
import { InvalidNameError } from "@/modules/users/domain/errors/invalid-name.error";
import { InvalidPasswordError } from "@/modules/users/domain/errors/invalid-password.error";

export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    handle = async (
        request: FastifyRequest<{
            Body: CreateUserRequest;
        }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.createUserUseCase.execute(request.body);

            return reply.status(201).send(result);
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                return reply.status(409).send({ message: error.message });
            }

            if (
                error instanceof InvalidEmailError ||
                error instanceof InvalidNameError ||
                error instanceof InvalidPasswordError
            ) {
                return reply.status(400).send({ message: error.message });
            }

            throw error;
        }
    };
}
