import type { CreateUserUseCase } from "@/modules/users/application/use-cases/create-user";
import type { AuthTokensOutput } from "../dto/auth-tokens.dto";
import type { IssueTokensService } from "../services/issue-tokens.service";

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

export class RegisterUseCase {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly issueTokensService: IssueTokensService,
    ) {}

    async execute(input: RegisterInput): Promise<AuthTokensOutput> {
        const user = await this.createUserUseCase.execute(input);

        return this.issueTokensService.issue(user);
    }
}
