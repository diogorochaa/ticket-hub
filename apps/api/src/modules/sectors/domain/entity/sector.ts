import { randomUUID } from "node:crypto";

interface CreateSectorProps {
    eventId: string;
    name: string;
    capacity: number;
    priceCents: number;
}

interface SectorProps extends CreateSectorProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Sector {
    private constructor(private readonly props: SectorProps) {}

    static create(props: CreateSectorProps): Sector {
        return new Sector({
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        });
    }

    static restore(props: SectorProps): Sector {
        return new Sector(props);
    }

    get id() { return this.props.id; }
    get eventId() { return this.props.eventId; }
    get name() { return this.props.name; }
    get capacity() { return this.props.capacity; }
    get priceCents() { return this.props.priceCents; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    update(props: Partial<Pick<CreateSectorProps, "name" | "capacity" | "priceCents">>) {
        if (props.name !== undefined) this.props.name = props.name;
        if (props.capacity !== undefined) this.props.capacity = props.capacity;
        if (props.priceCents !== undefined) this.props.priceCents = props.priceCents;
        this.props.updatedAt = new Date();
    }
}
