export interface MessageBus {
    publish(routingKey: string, payload: unknown): Promise<void>;
}
