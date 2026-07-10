import { FastifyInstance } from "fastify";

import { CreateUserController } from "../controllers/create-user.controller";
import { createUserSchema } from "../schemas/create-user.schema";

export async function userRoutes(
    app: FastifyInstance,
    createUserController: CreateUserController,
) {
    app.post(
        "/users",
        { schema: { body: createUserSchema } },
        createUserController.handle,
    );
}
