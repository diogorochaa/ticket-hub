export type AccessTokenPayload = {
    sub: string;
};

export type TokenPair = {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
};

export interface TokenService {
    signAccessToken(userId: string): Promise<string>;
    verifyAccessToken(token: string): Promise<AccessTokenPayload>;
    generateRefreshToken(): string;
    hashRefreshToken(token: string): string;
    getAccessTokenTtlSeconds(): number;
    getRefreshTokenExpiresAt(): Date;
}
