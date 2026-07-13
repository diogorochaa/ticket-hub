import { FastifyReply, FastifyRequest } from "fastify";

import { GetUserByEmailUseCase } from "@/modules/users/application/use-cases/get-user-by-email";
import { UserNotFoundError } from "@/modules/users/domain/errors/user-not-found.error";
import type { GetUserByEmailParams } from "../schemas/get-user-by-email.schema";

export class GetUserByEmailController {
    constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

    handle = async (
        request: FastifyRequest<{ Params: GetUserByEmailParams }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.getUserByEmailUseCase.execute(request.params);

            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }

            throw error;
        }
    };
}
