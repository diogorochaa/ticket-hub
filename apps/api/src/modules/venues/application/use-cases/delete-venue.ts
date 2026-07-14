import { VenueNotFoundError } from "../../domain/errors/venue-not-found.error";
import type { VenueRepository } from "../../domain/repository/venue.repository";

export class DeleteVenueUseCase {
    constructor(private readonly venueRepository: VenueRepository) {}

    async execute(id: string): Promise<void> {
        const venue = await this.venueRepository.findById(id);
        if (!venue) throw new VenueNotFoundError();
        await this.venueRepository.delete(venue);
    }
}
