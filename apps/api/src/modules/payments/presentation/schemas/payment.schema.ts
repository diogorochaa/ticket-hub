import { z } from "zod";

export const createPaymentSchema = z.object({
    reservationId: z.uuid(),
    amountCents: z.number().int().positive(),
    externalId: z.string().min(1).optional(),
});

export const paymentWebhookSchema = z.object({
    paymentId: z.uuid(),
    status: z.enum(["APPROVED", "REFUSED"]),
});

export const paymentIdParamsSchema = z.object({ id: z.uuid() });

export type CreatePaymentRequest = z.infer<typeof createPaymentSchema>;
export type PaymentWebhookRequest = z.infer<typeof paymentWebhookSchema>;
export type PaymentIdParams = z.infer<typeof paymentIdParamsSchema>;
