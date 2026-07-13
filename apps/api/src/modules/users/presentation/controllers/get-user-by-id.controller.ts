import { FastifyReply, FastifyRequest } from "fastify";

import { GetUserByIdUseCase } from "@/modules/users/application/use-cases/get-user-by-id";
import { UserNotFoundError } from "@/modules/users/domain/errors/user-not-found.error";
import type { GetUserByIdParams } from "../schemas/get-user-by-id.schema";

export class GetUserByIdController {
    constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

    handle = async (
        request: FastifyRequest<{ Params: GetUserByIdParams }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.getUserByIdUseCase.execute(request.params);

            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return reply.status(404).send({ message: error.message });
            }

            throw error;
        }
    };
}
