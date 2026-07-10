

import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { Email } from "../../domain/value-objects/email";
import { UserMapper } from "./user.mapper";
import { PrismaClient } from "../../../../../generated/prisma/client";

export class PrismaUserRepository implements UserRepository {

    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(user: User): Promise<void> {
        await this.prisma.user.upsert({
            where: {
                id: user.id,
            },
            create: UserMapper.toPersistence(user),
            update: UserMapper.toPersistence(user),
        });
    }

    async findByEmail(email: Email): Promise<User | null> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: email.value,
            },
        });

        if (!user) {
            return null;
        }

        return UserMapper.toDomain(user);
    }

    async findById(id: string): Promise<User | null> {

        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        return UserMapper.toDomain(user);
    }

    async delete(user: User): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: user.id,
            },
        });
    }
}