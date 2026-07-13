import type { FastifyInstance } from "fastify";

import { CreateUserController } from "../controllers/create-user.controller";
import { DeleteUserController } from "../controllers/delete-user.controller";
import { GetUserByEmailController } from "../controllers/get-user-by-email.controller";
import { GetUserByIdController } from "../controllers/get-user-by-id.controller";
import { UpdateUserController } from "../controllers/update-user.controller";
import { createUserSchema } from "../schemas/create-user.schema";
import { deleteUserParamsSchema } from "../schemas/delete-user.schema";
import { getUserByEmailSchema } from "../schemas/get-user-by-email";
import { getUserByIdSchema } from "../schemas/get-user-by-id.schema";
import {
    updateUserBodySchema,
    updateUserParamsSchema,
} from "../schemas/update-user.schema";

export type UserControllers = {
    createUser: CreateUserController;
    getUserByEmail: GetUserByEmailController;
    getUserById: GetUserByIdController;
    updateUser: UpdateUserController;
    deleteUser: DeleteUserController;
};

export async function userRoutes(
    app: FastifyInstance,
    controllers: UserControllers,
) {
    app.post(
        "/users",
        { schema: { body: createUserSchema } },
        controllers.createUser.handle,
    );

    app.get(
        "/users/email",
        { schema: { querystring: getUserByEmailSchema } },
        controllers.getUserByEmail.handle,
    );

    app.get(
        "/users/:id",
        { schema: { params: getUserByIdSchema } },
        controllers.getUserById.handle,
    );

    app.patch(
        "/users/:id",
        {
            schema: {
                params: updateUserParamsSchema,
                body: updateUserBodySchema,
            },
        },
        controllers.updateUser.handle,
    );

    app.delete(
        "/users/:id",
        { schema: { params: deleteUserParamsSchema } },
        controllers.deleteUser.handle,
    );
}
