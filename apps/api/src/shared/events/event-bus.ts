export type EventHandler<T> = (event: T) => void | Promise<void>;

export class EventBus {
    private readonly handlers = new Map<string, EventHandler<unknown>[]>();

    on<T>(eventName: string, handler: EventHandler<T>): void {
        const list = this.handlers.get(eventName) ?? [];
        list.push(handler as EventHandler<unknown>);
        this.handlers.set(eventName, list);
    }

    async publish<T>(eventName: string, event: T): Promise<void> {
        const list = this.handlers.get(eventName) ?? [];

        for (const handler of list) {
            await handler(event);
        }
    }
}
