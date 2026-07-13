import type { prisma } from "@/infra/db/prisma/prisma";

export type AppDeps = {
    prisma: typeof prisma;
};
