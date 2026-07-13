import { User } from "../../domain/entity/user";
import { Email } from "../../domain/value-objects/email";
import { Name } from "../../domain/value-objects/name";
import { Password } from "../../domain/value-objects/password";

type PrismaUser = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
};

export class UserMapper {

    static toDomain(raw: PrismaUser): User {
        return User.restore({
            id: raw.id,
            name: Name.create(raw.name),
            email: Email.create(raw.email),
            password: Password.restore(raw.passwordHash),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }

    static toPersistence(user: User) {
        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
            passwordHash: user.password.value,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}