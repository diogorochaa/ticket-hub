import { FastifyReply, FastifyRequest } from "fastify";

import { DeleteUserUseCase } from "@/modules/users/application/use-cases/delete-user";
import { UserNotFoundError } from "@/modules/users/domain/errors/user-not-found.error";
import type { DeleteUserParams } from "../schemas/delete-user.schema";

export class DeleteUserController {
    constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

    handle = async (
        request: FastifyRequest<{ Params: DeleteUserParams }>,
        reply: FastifyReply,
    ) => {
        try {
            await this.deleteUserUseCase.execute(request.params);

            return reply.status(204).send();
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }

            throw error;
        }
    };
}
