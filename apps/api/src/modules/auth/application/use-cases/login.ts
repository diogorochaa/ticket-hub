import type { UserRepository } from "@/modules/users/domain/repository/user.repository";
import type { PasswordHasher } from "@/modules/users/application/ports/password-hasher";
import { Email } from "@/modules/users/domain/value-objects/email";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials.error";
import type { AuthTokensOutput } from "../dto/auth-tokens.dto";
import type { IssueTokensService } from "../services/issue-tokens.service";

export type LoginInput = {
    email: string;
    password: string;
};

export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly issueTokensService: IssueTokensService,
    ) {}

    async execute(input: LoginInput): Promise<AuthTokensOutput> {
        const email = Email.create(input.email);
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const matches = await this.passwordHasher.compare(
            input.password,
            user.password.value,
        );

        if (!matches) {
            throw new InvalidCredentialsError();
        }

        return this.issueTokensService.issue({
            id: user.id,
            name: user.name.value,
            email: user.email.value,
        });
    }
}
