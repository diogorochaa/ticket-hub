import { randomUUID } from "node:crypto";

import { Email } from "../value-objects/email";
import { Name } from "../value-objects/name";
import { Password } from "../value-objects/password";

interface CreateUserProps {
    name: Name;
    email: Email;
    password: Password;
}

interface UserProps extends CreateUserProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private constructor(private readonly props: UserProps) {}

    static create(props: CreateUserProps): User {
        return new User({
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...props,
        });
    }

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    changeName(name: Name) {
        this.props.name = name;
        this.touch();
    }

    changeEmail(email: Email) {
        this.props.email = email;
        this.touch();
    }

    changePassword(password: Password) {
        this.props.password = password;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }
}