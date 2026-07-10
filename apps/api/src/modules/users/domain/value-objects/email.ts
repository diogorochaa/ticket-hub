import { InvalidEmailError } from "../errors/invalid-email.error";

export class Email {
    private constructor(private readonly _value: string) {}

    static create(value: string): Email {
        const normalized = value.trim();

        if (!normalized) {
            throw new InvalidEmailError("Email is required");
        }

        if (!normalized.includes("@")) {
            throw new InvalidEmailError("Invalid email");
        }

        return new Email(normalized);
    }

    get value(): string {
        return this._value;
    }

    equals(other: Email): boolean {
        return this._value === other._value;
    }
}