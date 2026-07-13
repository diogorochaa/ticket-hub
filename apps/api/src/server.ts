import Fastify from "fastify";
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";

import { registerModules } from "@/core/register-modules";
import { prisma } from "@/infra/db/prisma/prisma";

const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await registerModules(app, { prisma });

try {
    const address = await app.listen({ port: 3000 });
    console.log(`Server is running on ${address}`);
} catch (err) {
    console.error(err);
    process.exit(1);
}
