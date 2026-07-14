export class SectorNotFoundError extends Error {
    constructor() {
        super("Sector not found.");
        this.name = "SectorNotFoundError";
    }
}
