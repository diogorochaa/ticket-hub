export const CacheKeys = {
    sectorAvailable: (sectorId: string) => `sector:${sectorId}:available`,
    eventCatalog: (eventId: string) => `event:${eventId}:catalog`,
} as const;

export const LockKeys = {
    ticket: (ticketId: string) => `lock:ticket:${ticketId}`,
} as const;

export const RoutingKeys = {
    ticketReserved: "ticket.reserved",
    ticketReleased: "ticket.released",
    ticketSold: "ticket.sold",
    reservationCancelled: "reservation.cancelled",
} as const;
