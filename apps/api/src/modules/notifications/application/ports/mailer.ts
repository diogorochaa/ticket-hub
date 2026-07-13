export type WelcomeEmailInput = {
    to: string;
    name: string;
};

export interface Mailer {
    sendWelcome(input: WelcomeEmailInput): Promise<void>;
}
