import { z } from "zod";

export const createEventSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    startsAt: z.iso.datetime(),
    venueId: z.uuid(),
    organizerId: z.uuid(),
});

export const updateEventBodySchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    startsAt: z.iso.datetime().optional(),
    venueId: z.uuid().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]).optional(),
}).refine(
    (data) =>
        data.name !== undefined ||
        data.description !== undefined ||
        data.startsAt !== undefined ||
        data.venueId !== undefined ||
        data.status !== undefined,
    { message: "At least one field must be provided." },
);

export const eventIdParamsSchema = z.object({ id: z.uuid() });

export type CreateEventRequest = z.infer<typeof createEventSchema>;
export type UpdateEventBody = z.infer<typeof updateEventBodySchema>;
export type EventIdParams = z.infer<typeof eventIdParamsSchema>;
