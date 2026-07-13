import { FastifyReply, FastifyRequest } from "fastify";

import { UpdateUserUseCase } from "@/modules/users/application/use-cases/update-user";
import { UserAlreadyExistsError } from "@/modules/users/domain/errors/user-already-exists.error";
import { UserNotFoundError } from "@/modules/users/domain/errors/user-not-found.error";
import { InvalidEmailError } from "@/modules/users/domain/errors/invalid-email.error";
import { InvalidNameError } from "@/modules/users/domain/errors/invalid-name.error";
import { InvalidPasswordError } from "@/modules/users/domain/errors/invalid-password.error";
import type {
    UpdateUserBody,
    UpdateUserParams,
} from "../schemas/update-user.schema";

export class UpdateUserController {
    constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

    handle = async (
        request: FastifyRequest<{
            Params: UpdateUserParams;
            Body: UpdateUserBody;
        }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.updateUserUseCase.execute({
                id: request.params.id,
                ...request.body,
            });

            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }

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
