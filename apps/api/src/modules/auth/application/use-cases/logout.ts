import { InvalidRefreshTokenError } from "../../domain/errors/invalid-refresh-token.error";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token.repository";
import type { TokenService } from "../ports/token-service";

export type LogoutInput = {
    refreshToken: string;
};

export class LogoutUseCase {
    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly tokenService: TokenService,
    ) {}

    async execute(input: LogoutInput): Promise<void> {
        const tokenHash = this.tokenService.hashRefreshToken(input.refreshToken);
        const stored = await this.refreshTokenRepository.findByTokenHash(tokenHash);

        if (!stored || stored.isRevoked) {
            throw new InvalidRefreshTokenError();
        }

        await this.refreshTokenRepository.revoke(stored);
    }
}
