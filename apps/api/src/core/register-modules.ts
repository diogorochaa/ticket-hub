import type { FastifyInstance } from "fastify";

import type { AppDeps } from "@/core/app-deps";
import { registerAuthModule } from "@/modules/auth/auth.module";
import { registerEventsModule } from "@/modules/events/events.module";
import { registerNotificationsModule } from "@/modules/notifications/notifications.module";
import { registerPaymentsModule } from "@/modules/payments/payments.module";
import { registerReservationsModule } from "@/modules/reservations/reservations.module";
import { registerSectorsModule } from "@/modules/sectors/sectors.module";
import { registerTicketsModule } from "@/modules/tickets/tickets.module";
import { registerUsersModule } from "@/modules/users/users.module";
import { registerVenuesModule } from "@/modules/venues/venues.module";

export async function registerModules(
    app: FastifyInstance,
    deps: AppDeps,
) {
    registerNotificationsModule(deps.eventBus, deps.mailer);
    await registerUsersModule(app, deps);
    await registerAuthModule(app, deps);
    await registerVenuesModule(app, deps);
    await registerEventsModule(app, deps);
    await registerSectorsModule(app, deps);
    await registerTicketsModule(app, deps);
    await registerReservationsModule(app, deps);
    await registerPaymentsModule(app, deps);
}
