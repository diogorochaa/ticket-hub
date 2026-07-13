import { createHash, randomBytes } from "node:crypto";

import { SignJWT, jwtVerify } from "jose";

import type {
    AccessTokenPayload,
    TokenService,
} from "@/modules/auth/application/ports/token-service";

type JwtTokenServiceOptions = {
    secret: string;
    accessTokenTtlSeconds?: number;
    refreshTokenTtlDays?: number;
};

export class JwtTokenService implements TokenService {
    private readonly secret: Uint8Array;
    private readonly accessTokenTtlSeconds: number;
    private readonly refreshTokenTtlDays: number;

    constructor(options: JwtTokenServiceOptions) {
        this.secret = new TextEncoder().encode(options.secret);
        this.accessTokenTtlSeconds = options.accessTokenTtlSeconds ?? 15 * 60;
        this.refreshTokenTtlDays = options.refreshTokenTtlDays ?? 7;
    }

    async signAccessToken(userId: string): Promise<string> {
        return new SignJWT({})
            .setProtectedHeader({ alg: "HS256" })
            .setSubject(userId)
            .setIssuedAt()
            .setExpirationTime(`${this.accessTokenTtlSeconds}s`)
            .sign(this.secret);
    }

    async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
        const { payload } = await jwtVerify(token, this.secret);

        if (!payload.sub) {
            throw new Error("Access token missing subject.");
        }

        return { sub: payload.sub };
    }

    generateRefreshToken(): string {
        return randomBytes(48).toString("base64url");
    }

    hashRefreshToken(token: string): string {
        return createHash("sha256").update(token).digest("hex");
    }

    getAccessTokenTtlSeconds(): number {
        return this.accessTokenTtlSeconds;
    }

    getRefreshTokenExpiresAt(): Date {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + this.refreshTokenTtlDays);
        return expiresAt;
    }
}
