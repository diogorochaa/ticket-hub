import { randomUUID } from "node:crypto";

interface CreateRefreshTokenProps {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
}

interface RefreshTokenProps extends CreateRefreshTokenProps {
    id: string;
    revokedAt: Date | null;
    createdAt: Date;
}

export class RefreshToken {
    private constructor(private readonly props: RefreshTokenProps) {}

    static create(props: CreateRefreshTokenProps): RefreshToken {
        return new RefreshToken({
            id: randomUUID(),
            revokedAt: null,
            createdAt: new Date(),
            ...props,
        });
    }

    static restore(props: RefreshTokenProps): RefreshToken {
        return new RefreshToken(props);
    }

    get id() {
        return this.props.id;
    }

    get userId() {
        return this.props.userId;
    }

    get tokenHash() {
        return this.props.tokenHash;
    }

    get expiresAt() {
        return this.props.expiresAt;
    }

    get revokedAt() {
        return this.props.revokedAt;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get isExpired() {
        return this.props.expiresAt.getTime() <= Date.now();
    }

    get isRevoked() {
        return this.props.revokedAt !== null;
    }

    get isActive() {
        return !this.isExpired && !this.isRevoked;
    }

    revoke() {
        this.props.revokedAt = new Date();
    }
}
