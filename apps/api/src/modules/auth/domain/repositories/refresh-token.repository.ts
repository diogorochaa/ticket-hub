import type { RefreshToken } from "../entities/refresh-token";

export interface RefreshTokenRepository {
    save(token: RefreshToken): Promise<void>;
    findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
    revoke(token: RefreshToken): Promise<void>;
}
