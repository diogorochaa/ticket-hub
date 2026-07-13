import nodemailer from "nodemailer";

import type { Mailer, WelcomeEmailInput } from "../../application/ports/mailer";

type SmtpMailerOptions = {
    host: string;
    port: number;
    from: string;
};

export class SmtpMailer implements Mailer {
    private readonly transporter;
    private readonly from: string;

    constructor(options: SmtpMailerOptions) {
        this.from = options.from;
        this.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: false,
        });
    }

    async sendWelcome(input: WelcomeEmailInput): Promise<void> {
        await this.transporter.sendMail({
            from: this.from,
            to: input.to,
            subject: "Bem-vindo ao TicketHub",
            text: `Olá ${input.name},\n\nSua conta no TicketHub foi criada com sucesso.\n\nBons eventos!`,
            html: `<p>Olá <strong>${input.name}</strong>,</p><p>Sua conta no TicketHub foi criada com sucesso.</p><p>Bons eventos!</p>`,
        });
    }
}
