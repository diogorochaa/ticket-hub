import z from "zod";

export const getUserByEmailSchema = z.object({
    email: z.email(),
});

export type GetUserByEmailRequest = z.infer<typeof getUserByEmailSchema>;