import { VenueNotFoundError } from "../../domain/errors/venue-not-found.error";
import type { VenueRepository } from "../../domain/repository/venue.repository";
import type { UpdateVenueInput, VenueOutput } from "../dto/venue.dto";

export class UpdateVenueUseCase {
    constructor(private readonly venueRepository: VenueRepository) {}

    async execute(input: UpdateVenueInput): Promise<VenueOutput> {
        const venue = await this.venueRepository.findById(input.id);
        if (!venue) throw new VenueNotFoundError();
        venue.update({ name: input.name, address: input.address });
        await this.venueRepository.save(venue);
        return {
            id: venue.id,
            name: venue.name,
            address: venue.address,
            createdAt: venue.createdAt,
            updatedAt: venue.updatedAt,
        };
    }
}
