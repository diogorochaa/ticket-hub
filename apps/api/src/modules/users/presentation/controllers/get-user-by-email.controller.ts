import { GetUserByEmailUseCase } from "@/modules/users/application/use-cases/get-user-by-email";
import { UserNotFoundError } from "@/modules/users/domain/errors/user-not-found.error";
import { GetUserByEmailRequest } from "@/modules/users/presentation/schemas/get-user-by-email";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetUserByEmailController {
    constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

    handle = async (
        request: FastifyRequest<{ Querystring: GetUserByEmailRequest }>,
        response: FastifyReply,
    ) => {
        try {
            const result = await this.getUserByEmailUseCase.execute(request.query);

            return response.status(200).send(result);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return response.status(404).send({ message: error.message });
            }

            throw error;
        }
    };
}
