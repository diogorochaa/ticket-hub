import { z } from "zod";

export const createSectorSchema = z.object({
    name: z.string().min(1),
    capacity: z.number().int().positive(),
    priceCents: z.number().int().nonnegative(),
});

export const updateSectorBodySchema = z.object({
    name: z.string().min(1).optional(),
    capacity: z.number().int().positive().optional(),
    priceCents: z.number().int().nonnegative().optional(),
}).refine(
    (data) =>
        data.name !== undefined ||
        data.capacity !== undefined ||
        data.priceCents !== undefined,
    { message: "At least one field must be provided." },
);

export const eventIdParamsSchema = z.object({ eventId: z.uuid() });
export const sectorIdParamsSchema = z.object({ id: z.uuid() });

export type CreateSectorRequest = z.infer<typeof createSectorSchema>;
export type UpdateSectorBody = z.infer<typeof updateSectorBodySchema>;
export type EventIdParams = z.infer<typeof eventIdParamsSchema>;
export type SectorIdParams = z.infer<typeof sectorIdParamsSchema>;
