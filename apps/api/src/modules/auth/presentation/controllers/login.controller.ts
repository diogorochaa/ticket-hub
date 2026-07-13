import type { FastifyReply, FastifyRequest } from "fastify";

import type { LoginUseCase } from "@/modules/auth/application/use-cases/login";
import { InvalidCredentialsError } from "@/modules/auth/domain/errors/invalid-credentials.error";
import { InvalidEmailError } from "@/modules/users/domain/errors/invalid-email.error";
import type { LoginRequest } from "../schemas/login.schema";

export class LoginController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    handle = async (
        request: FastifyRequest<{ Body: LoginRequest }>,
        reply: FastifyReply,
    ) => {
        try {
            const result = await this.loginUseCase.execute(request.body);
            return reply.status(200).send(result);
        } catch (error) {
            if (
                error instanceof InvalidCredentialsError ||
                error instanceof InvalidEmailError
            ) {
                return reply.status(401).send({ message: "Invalid credentials." });
            }

            throw error;
        }
    };
}
