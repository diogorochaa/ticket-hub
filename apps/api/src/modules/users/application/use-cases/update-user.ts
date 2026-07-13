import type { UpdateUserInput, UpdateUserOutput } from "../dto/update-user.dto";
import { UserAlreadyExistsError } from "../../domain/errors/user-already-exists.error";
import { UserNotFoundError } from "../../domain/errors/user-not-found.error";
import type { UserRepository } from "../../domain/repositories/user.repository";
import { Email } from "../../domain/value-objects/email";
import { Name } from "../../domain/value-objects/name";
import { Password } from "../../domain/value-objects/password";

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
        const user = await this.userRepository.findById(input.id);

        if (!user) {
            throw new UserNotFoundError();
        }

        if (input.name !== undefined) {
            user.changeName(Name.create(input.name));
        }

        if (input.email !== undefined) {
            const email = Email.create(input.email);
            const existingUser = await this.userRepository.findByEmail(email);

            if (existingUser && existingUser.id !== user.id) {
                throw new UserAlreadyExistsError();
            }

            user.changeEmail(email);
        }

        if (input.password !== undefined) {
            user.changePassword(Password.create(input.password));
        }

        await this.userRepository.save(user);

        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
        };
    }
}
