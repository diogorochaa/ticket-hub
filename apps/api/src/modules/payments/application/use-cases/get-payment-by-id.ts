import { PaymentNotFoundError } from "../../domain/errors/payment-not-found.error";
import type { PaymentRepository } from "../../domain/repository/payment.repository";
import type { PaymentOutput } from "../dto/payment.dto";
import { toPaymentOutput } from "./create-payment";

export class GetPaymentByIdUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async execute(id: string): Promise<PaymentOutput> {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) throw new PaymentNotFoundError();
        return toPaymentOutput(payment);
    }
}
