import { InvalidNameError } from "../errors/invalid-name.error";

export class Name {
    private constructor(private readonly _value: string) {}

    static create(value: string): Name {
        const normalized = value.trim();

        if (!normalized) {
            throw new InvalidNameError("Name is required");
        }

        if (normalized.length < 3) {
            throw new InvalidNameError("Name must be at least 3 characters long");
        }

        return new Name(normalized);
    }

    equals(other: Name): boolean {
        return this._value === other._value;
    }

    get value(): string {
        return this._value;
    }
}