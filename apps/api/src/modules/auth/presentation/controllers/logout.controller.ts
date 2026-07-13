import type { FastifyReply, FastifyRequest } from "fastify";

import type { LogoutUseCase } from "@/modules/auth/application/use-cases/logout";
import { InvalidRefreshTokenError } from "@/modules/auth/domain/errors/invalid-refresh-token.error";
import type { LogoutRequest } from "../schemas/logout.schema";

export class LogoutController {
    constructor(private readonly logoutUseCase: LogoutUseCase) {}

    handle = async (
        request: FastifyRequest<{ Body: LogoutRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            await this.logoutUseCase.execute(request.body);
            return reply.status(204).send();
        } catch (error) {
            if (error instanceof InvalidRefreshTokenError) {
                return reply.status(401).send({ message: error.message });
            }

            throw error;
        }
    };
}
