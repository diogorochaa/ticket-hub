import { z } from "zod";

export const logoutSchema = z.object({
    refreshToken: z.string().min(1),
});

export type LogoutRequest = z.infer<typeof logoutSchema>;
