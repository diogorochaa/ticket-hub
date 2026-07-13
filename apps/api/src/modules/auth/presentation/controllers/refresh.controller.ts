import type { FastifyReply, FastifyRequest } from "fastify";

import type { RefreshUseCase } from "@/modules/auth/application/use-cases/refresh";
import { InvalidRefreshTokenError } from "@/modules/auth/domain/errors/invalid-refresh-token.error";
import type { RefreshRequest } from "../schemas/refresh.schema";

export class RefreshController {
    constructor(private readonly refreshUseCase: RefreshUseCase) {}

    handle = async (
        request: FastifyRequest<{ Body: RefreshRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.refreshUseCase.execute(request.body);
            return reply.status(200).send(result);
        } catch (error) {
            if (error instanceof InvalidRefreshTokenError) {
                return reply.status(401).send({ message: error.message });
            }

            throw error;
        }
    };
}
