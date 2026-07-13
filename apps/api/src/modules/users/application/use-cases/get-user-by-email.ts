import { GetUserByEmailInput, GetUserByEmailOutput } from "@/modules/users/application/dto/get-user-by-email.dto";
import { UserNotFoundError } from "@/modules/users/domain/errors/user-not-found.error";
import { UserRepository } from "@/modules/users/domain/repository/user.repository";
import { Email } from "@/modules/users/domain/value-objects/email";

export class GetUserByEmailUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
        const email = Email.create(input.email);
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UserNotFoundError();
        }

        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
        };
    }
}