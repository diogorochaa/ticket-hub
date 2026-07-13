import { InvalidPasswordError } from "../errors/invalid-password.error";

export class Password {
    private constructor(private readonly _value: string) {}

    static create(plain: string): Password {
        const normalized = plain.trim();

        if (!normalized) {
            throw new InvalidPasswordError("Password is required.");
        }

        if (normalized.length < 6) {
            throw new InvalidPasswordError(
                "Password must be at least 6 characters long.",
            );
        }

        return new Password(normalized);
    }

    static restore(hash: string): Password {
        if (!hash) {
            throw new InvalidPasswordError("Password hash is required.");
        }

        return new Password(hash);
    }

    get value() {
        return this._value;
    }

    equals(other: Password): boolean {
        return this._value === other._value;
    }
}
