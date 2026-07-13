export type UpdateUserInput = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
};

export type UpdateUserOutput = {
    id: string;
    name: string;
    email: string;
};
