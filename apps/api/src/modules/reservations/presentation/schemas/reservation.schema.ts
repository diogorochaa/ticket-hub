import { z } from "zod";

export const createReservationSchema = z.object({
    userId: z.uuid(),
    ticketId: z.uuid(),
    ttlMinutes: z.number().int().positive().max(60).optional(),
});

export const reservationIdParamsSchema = z.object({ id: z.uuid() });
export const userIdParamsSchema = z.object({ userId: z.uuid() });

export type CreateReservationRequest = z.infer<typeof createReservationSchema>;
export type ReservationIdParams = z.infer<typeof reservationIdParamsSchema>;
export type UserIdParams = z.infer<typeof userIdParamsSchema>;
