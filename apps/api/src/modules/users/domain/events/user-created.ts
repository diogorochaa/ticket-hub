export class UserCreated {
    readonly occurredAt = new Date();

    constructor(
        readonly userId: string,
        readonly name: string,
        readonly email: string,
    ) {}
}
