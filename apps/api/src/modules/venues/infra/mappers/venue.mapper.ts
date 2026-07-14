import { Venue } from "../../domain/entity/venue";

type PrismaVenue = {
    id: string;
    name: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
};

export class VenueMapper {
    static toDomain(raw: PrismaVenue): Venue {
        return Venue.restore(raw);
    }

    static toPersistence(venue: Venue) {
        return {
            id: venue.id,
            name: venue.name,
            address: venue.address,
            createdAt: venue.createdAt,
            updatedAt: venue.updatedAt,
        };
    }
}
