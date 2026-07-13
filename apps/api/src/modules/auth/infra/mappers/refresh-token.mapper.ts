import { RefreshToken } from "../../domain/entities/refresh-token";

type PrismaRefreshToken = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    revokedAt: Date | null;
    createdAt: Date;
};

export class RefreshTokenMapper {
    static toDomain(raw: PrismaRefreshToken): RefreshToken {
        return RefreshToken.restore({
            id: raw.id,
            userId: raw.userId,
            tokenHash: raw.tokenHash,
            expiresAt: raw.expiresAt,
            revokedAt: raw.revokedAt,
            createdAt: raw.createdAt,
        });
    }

    static toPersistence(token: RefreshToken) {
        return {
            id: token.id,
            userId: token.userId,
            tokenHash: token.tokenHash,
            expiresAt: token.expiresAt,
            revokedAt: token.revokedAt,
            createdAt: token.createdAt,
        };
    }
}
