import { RefreshToken } from "../../domain/entities/refresh-token";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token.repository";
import type { TokenService } from "../ports/token-service";
import type { AuthTokensOutput } from "../dto/auth-tokens.dto";

type IssueTokensUser = {
    id: string;
    name: string;
    email: string;
};

export class IssueTokensService {
    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly tokenService: TokenService,
    ) {}

    async issue(user: IssueTokensUser): Promise<AuthTokensOutput> {
        const accessToken = await this.tokenService.signAccessToken(user.id);
        const refreshToken = this.tokenService.generateRefreshToken();
        const tokenHash = this.tokenService.hashRefreshToken(refreshToken);

        await this.refreshTokenRepository.save(
            RefreshToken.create({
                userId: user.id,
                tokenHash,
                expiresAt: this.tokenService.getRefreshTokenExpiresAt(),
            }),
        );

        return {
            accessToken,
            refreshToken,
            accessTokenExpiresIn: this.tokenService.getAccessTokenTtlSeconds(),
            user,
        };
    }
}
