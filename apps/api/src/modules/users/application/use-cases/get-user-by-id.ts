import type { GetUserByIdInput, GetUserByIdOutput } from "../dto/get-user-by-id.dto";
import { UserNotFoundError } from "../../domain/errors/user-not-found.error";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: GetUserByIdInput): Promise<GetUserByIdOutput> {
        const user = await this.userRepository.findById(input.id);

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
