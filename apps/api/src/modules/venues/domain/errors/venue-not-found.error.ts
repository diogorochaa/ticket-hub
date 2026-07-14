export class VenueNotFoundError extends Error {
    constructor() {
        super("Venue not found.");
        this.name = "VenueNotFoundError";
    }
}
