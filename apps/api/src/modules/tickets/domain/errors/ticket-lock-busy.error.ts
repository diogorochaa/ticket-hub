export class TicketLockBusyError extends Error {
    constructor() {
        super("Ticket is being reserved by another request.");
        this.name = "TicketLockBusyError";
    }
}
