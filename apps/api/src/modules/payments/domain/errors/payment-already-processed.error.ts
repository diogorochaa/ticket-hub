export class PaymentAlreadyProcessedError extends Error {
    constructor() {
        super("Payment already processed.");
        this.name = "PaymentAlreadyProcessedError";
    }
}
