export class TicketNotAvailableError extends Error {
    constructor() {
        super("Ticket is not available.");
        this.name = "TicketNotAvailableError";
    }
}
