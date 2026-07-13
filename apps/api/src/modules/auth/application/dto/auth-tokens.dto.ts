export type AuthTokensOutput = {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    user: {
        id: string;
        name: string;
        email: string;
    };
};
