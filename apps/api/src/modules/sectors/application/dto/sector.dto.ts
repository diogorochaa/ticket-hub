export type SectorOutput = {
    id: string;
    eventId: string;
    name: string;
    capacity: number;
    priceCents: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateSectorInput = {
    eventId: string;
    name: string;
    capacity: number;
    priceCents: number;
};

export type UpdateSectorInput = {
    id: string;
    name?: string;
    capacity?: number;
    priceCents?: number;
};
