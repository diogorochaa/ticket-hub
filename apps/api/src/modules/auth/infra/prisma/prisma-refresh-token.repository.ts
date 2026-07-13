import type { RefreshToken } from "../../domain/entities/refresh-token";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token.repository";
import { RefreshTokenMapper } from "../mappers/refresh-token.mapper";
import type { PrismaClient } from "../../../../../generated/prisma/client";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(token: RefreshToken): Promise<void> {
        const data = RefreshTokenMapper.toPersistence(token);

        await this.prisma.refreshToken.upsert({
            where: { id: token.id },
            create: data,
            update: {
                tokenHash: data.tokenHash,
                expiresAt: data.expiresAt,
                revokedAt: data.revokedAt,
            },
        });
    }

    async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
        const record = await this.prisma.refreshToken.findUnique({
            where: { tokenHash },
        });

        if (!record) {
            return null;
        }

        return RefreshTokenMapper.toDomain(record);
    }

    async revoke(token: RefreshToken): Promise<void> {
        token.revoke();
        await this.save(token);
    }
}
