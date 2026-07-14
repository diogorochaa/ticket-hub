export type VenueOutput = {
    id: string;
    name: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateVenueInput = { name: string; address: string };
export type UpdateVenueInput = { id: string; name?: string; address?: string };
