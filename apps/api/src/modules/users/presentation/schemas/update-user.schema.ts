import { z } from "zod";

export const updateUserParamsSchema = z.object({
    id: z.uuid(),
});

export const updateUserBodySchema = z
    .object({
        name: z.string().min(1).optional(),
        email: z.email().optional(),
        password: z.string().min(8).optional(),
    })
    .refine(
        (data) =>
            data.name !== undefined ||
            data.email !== undefined ||
            data.password !== undefined,
        { message: "At least one field must be provided." },
    );

export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
