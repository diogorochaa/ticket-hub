import amqp, { type Channel, type ChannelModel } from "amqplib";

import type { MessageBus } from "@/shared/ports/message-bus";

const EXCHANGE = "ticket-hub.events";

export class RabbitMqMessageBus implements MessageBus {
    private connection: ChannelModel | null = null;
    private channel: Channel | null = null;

    constructor(private readonly url: string) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(this.url);
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(EXCHANGE, "topic", { durable: true });
    }

    async publish(routingKey: string, payload: unknown): Promise<void> {
        if (!this.channel) {
            throw new Error("RabbitMQ channel is not connected.");
        }

        const body = Buffer.from(JSON.stringify({
            routingKey,
            payload,
            occurredAt: new Date().toISOString(),
        }));

        this.channel.publish(EXCHANGE, routingKey, body, {
            contentType: "application/json",
            persistent: true,
        });
    }

    async close(): Promise<void> {
        await this.channel?.close();
        await this.connection?.close();
        this.channel = null;
        this.connection = null;
    }
}
