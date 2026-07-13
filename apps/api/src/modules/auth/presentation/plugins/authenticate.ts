import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import type { TokenService } from "@/modules/auth/application/ports/token-service";

export type AuthenticatedUser = {
    id: string;
};

declare module "fastify" {
    interface FastifyRequest {
        user?: AuthenticatedUser;
    }

    interface FastifyInstance {
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply,
        ) => Promise<void>;
    }
}

export async function registerAuthenticatePlugin(
    app: FastifyInstance,
    tokenService: TokenService,
) {
    app.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const header = request.headers.authorization;

            if (!header?.startsWith("Bearer ")) {
                return reply.status(401).send({ message: "Unauthorized." });
            }

            const token = header.slice("Bearer ".length);

            try {
                const payload = await tokenService.verifyAccessToken(token);
                request.user = { id: payload.sub };
            } catch {
                return reply.status(401).send({ message: "Unauthorized." });
            }
        },
    );
}
