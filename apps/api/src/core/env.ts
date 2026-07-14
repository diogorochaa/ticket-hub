import "dotenv/config";

function required(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    databaseUrl: required("DATABASE_URL"),
    jwtSecret: required("JWT_SECRET", "dev-ticket-hub-jwt-secret-change-me"),
    accessTokenTtlSeconds: Number(process.env.ACCESS_TOKEN_TTL_SECONDS ?? 900),
    refreshTokenTtlDays: Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? 7),
    smtpHost: required("SMTP_HOST", "localhost"),
    smtpPort: Number(process.env.SMTP_PORT ?? 1025),
    mailFrom: required("MAIL_FROM", "noreply@tickethub.local"),
    redisUrl: required("REDIS_URL", "redis://localhost:6379"),
    rabbitmqUrl: required("RABBITMQ_URL", "amqp://ticket:ticket@localhost:5673"),
};
