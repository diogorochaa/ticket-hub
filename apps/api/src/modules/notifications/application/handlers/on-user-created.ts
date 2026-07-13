import type { UserCreated } from "@/modules/users/domain/events/user-created";
import type { Mailer } from "../ports/mailer";

export class OnUserCreatedHandler {
    constructor(private readonly mailer: Mailer) {}

    handle = async (event: UserCreated): Promise<void> => {
        try {
            await this.mailer.sendWelcome({
                to: event.email,
                name: event.name,
            });
        } catch (error) {
            console.error("Failed to send welcome email:", error);
        }
    };
}
