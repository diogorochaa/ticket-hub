import { z } from "zod";

export const generateTicketsSchema = z.object({
    quantity: z.number().int().positive().max(1000),
});

export const updateTicketStatusSchema = z.object({
    status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "CANCELLED"]),
});

export const sectorIdParamsSchema = z.object({ sectorId: z.uuid() });
export const eventIdParamsSchema = z.object({ eventId: z.uuid() });
export const ticketIdParamsSchema = z.object({ id: z.uuid() });

export type GenerateTicketsRequest = z.infer<typeof generateTicketsSchema>;
export type UpdateTicketStatusBody = z.infer<typeof updateTicketStatusSchema>;
export type SectorIdParams = z.infer<typeof sectorIdParamsSchema>;
export type EventIdParams = z.infer<typeof eventIdParamsSchema>;
export type TicketIdParams = z.infer<typeof ticketIdParamsSchema>;
