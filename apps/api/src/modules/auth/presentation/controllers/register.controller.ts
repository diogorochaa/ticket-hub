import type { FastifyReply, FastifyRequest } from "fastify";

import type { RegisterUseCase } from "@/modules/auth/application/use-cases/register";
import { UserAlreadyExistsError } from "@/modules/users/domain/errors/user-already-exists.error";
import { InvalidEmailError } from "@/modules/users/domain/errors/invalid-email.error";
import { InvalidNameError } from "@/modules/users/domain/errors/invalid-name.error";
import { InvalidPasswordError } from "@/modules/users/domain/errors/invalid-password.error";
import type { RegisterRequest } from "../schemas/register.schema";

export class RegisterController {
    constructor(private readonly registerUseCase: RegisterUseCase) {}

    handle = async (
        request: FastifyRequest<{ Body: RegisterRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.registerUseCase.execute(request.body);
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
