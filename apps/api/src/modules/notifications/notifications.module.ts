import type { EventBus } from "@/shared/events/event-bus";
import type { UserCreated } from "@/modules/users/domain/events/user-created";
import type { Mailer } from "./application/ports/mailer";
import { OnUserCreatedHandler } from "./application/handlers/on-user-created";

export function registerNotificationsModule(
    eventBus: EventBus,
    mailer: Mailer,
) {
    const onUserCreated = new OnUserCreatedHandler(mailer);

    eventBus.on<UserCreated>("user.created", onUserCreated.handle);
}
