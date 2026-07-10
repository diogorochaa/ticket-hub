import { User } from "../entities/user";
import { Email } from "../value-objects/email";

export interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: Email): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    delete(user: User): Promise<void>;
}