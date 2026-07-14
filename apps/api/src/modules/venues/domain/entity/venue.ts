import { randomUUID } from "node:crypto";

interface CreateVenueProps {
    name: string;
    address: string;
}

interface VenueProps extends CreateVenueProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Venue {
    private constructor(private readonly props: VenueProps) {}

    static create(props: CreateVenueProps): Venue {
        return new Venue({
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        });
    }

    static restore(props: VenueProps): Venue {
        return new Venue(props);
    }

    get id() { return this.props.id; }
    get name() { return this.props.name; }
    get address() { return this.props.address; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    update(props: Partial<CreateVenueProps>) {
        if (props.name !== undefined) this.props.name = props.name;
        if (props.address !== undefined) this.props.address = props.address;
        this.props.updatedAt = new Date();
    }
}
