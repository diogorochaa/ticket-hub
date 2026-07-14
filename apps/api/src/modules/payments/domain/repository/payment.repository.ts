import type { Payment } from "../entity/payment";

export interface PaymentRepository {
    save(payment: Payment): Promise<void>;
    findById(id: string): Promise<Payment | null>;
    findByReservationId(reservationId: string): Promise<Payment | null>;
    findByExternalId(externalId: string): Promise<Payment | null>;
}
