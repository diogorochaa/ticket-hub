import { z } from "zod";

export const getUserByIdSchema = z.object({
    id: z.uuid(),
});

export type GetUserByIdParams = z.infer<typeof getUserByIdSchema>;
