import { User } from "../../domain/entity/user";
import { UserRepository } from "../../domain/repository/user.repository";
import { Name } from "../../domain/value-objects/name";
import { Email } from "../../domain/value-objects/email";
import { Password } from "../../domain/value-objects/password";
import type { CreateUserInput, CreateUserOutput } from "../dto/create-user.dto";
import { UserAlreadyExistsError } from "../../domain/errors/user-already-exists.error";
import type { PasswordHasher } from "../ports/password-hasher";
import type { EventBus } from "@/shared/events/event-bus";
import { UserCreated } from "../../domain/events/user-created";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly eventBus: EventBus,
    ) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const name = Name.create(input.name);
        const email = Email.create(input.email);
        const plainPassword = Password.create(input.password);

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await this.passwordHasher.hash(plainPassword.value);

        const user = User.create({
            name,
            email,
            password: Password.restore(passwordHash),
        });

        await this.userRepository.save(user);

        await this.eventBus.publish(
            "user.created",
            new UserCreated(user.id, user.name.value, user.email.value),
        );

        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
        };
    }
}
