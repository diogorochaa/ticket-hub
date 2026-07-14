import { z } from "zod";

export const createVenueSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
});

export const updateVenueBodySchema = z.object({
    name: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
}).refine((data) => data.name !== undefined || data.address !== undefined, {
    message: "At least one field must be provided.",
});

export const venueIdParamsSchema = z.object({
    id: z.uuid(),
});

export type CreateVenueRequest = z.infer<typeof createVenueSchema>;
export type UpdateVenueBody = z.infer<typeof updateVenueBodySchema>;
export type VenueIdParams = z.infer<typeof venueIdParamsSchema>;
