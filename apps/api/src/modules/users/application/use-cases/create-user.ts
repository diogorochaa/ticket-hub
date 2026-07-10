import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Name } from "../../domain/value-objects/name";
import { Email } from "../../domain/value-objects/email";
import { Password } from "../../domain/value-objects/password";
import type { CreateUserInput, CreateUserOutput } from "../dto/create-user.dto";
import { UserAlreadyExistsError } from "../../domain/errors/user-already-exists.error";

export class CreateUserUseCase  {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const name = Name.create(input.name);
        const email = Email.create(input.email);
        const password = Password.create(input.password);

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new UserAlreadyExistsError();
        }

        const user = User.create({
            name,
            email,
            password,
        });

        await this.userRepository.save(user);

        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
        };
    }
}