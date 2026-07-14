import type { FastifyInstance } from "fastify";

import type { PaymentController } from "../controllers/payment.controller";
import {
    createPaymentSchema,
    paymentIdParamsSchema,
    paymentWebhookSchema,
} from "../schemas/payment.schema";

export async function paymentRoutes(app: FastifyInstance, controller: PaymentController) {
    app.post("/payments", { schema: { body: createPaymentSchema } }, controller.create);
    app.get("/payments/:id", { schema: { params: paymentIdParamsSchema } }, controller.getById);
    app.post(
        "/payments/webhook",
        { schema: { body: paymentWebhookSchema } },
        controller.webhook,
    );
}
