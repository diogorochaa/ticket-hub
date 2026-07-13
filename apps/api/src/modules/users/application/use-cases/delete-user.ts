import type { DeleteUserInput } from "../dto/delete-user.dto";
import { UserNotFoundError } from "../../domain/errors/user-not-found.error";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: DeleteUserInput): Promise<void> {
        const user = await this.userRepository.findById(input.id);

        if (!user) {
            throw new UserNotFoundError();
        }

        await this.userRepository.delete(user);
    }
}
