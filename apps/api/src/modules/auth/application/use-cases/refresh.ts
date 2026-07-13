import type { UserRepository } from "@/modules/users/domain/repository/user.repository";
import { InvalidRefreshTokenError } from "../../domain/errors/invalid-refresh-token.error";
import type { RefreshTokenRepository } from "../../domain/repositories/refresh-token.repository";
import type { TokenService } from "../ports/token-service";
import type { AuthTokensOutput } from "../dto/auth-tokens.dto";
import type { IssueTokensService } from "../services/issue-tokens.service";

export type RefreshInput = {
    refreshToken: string;
};

export class RefreshUseCase {
    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly tokenService: TokenService,
        private readonly userRepository: UserRepository,
        private readonly issueTokensService: IssueTokensService,
    ) {}

    async execute(input: RefreshInput): Promise<AuthTokensOutput> {
        const tokenHash = this.tokenService.hashRefreshToken(input.refreshToken);
        const stored = await this.refreshTokenRepository.findByTokenHash(tokenHash);

        if (!stored || !stored.isActive) {
            throw new InvalidRefreshTokenError();
        }

        await this.refreshTokenRepository.revoke(stored);

        const user = await this.userRepository.findById(stored.userId);

        if (!user) {
            throw new InvalidRefreshTokenError();
        }

        return this.issueTokensService.issue({
            id: user.id,
            name: user.name.value,
            email: user.email.value,
        });
    }
}
