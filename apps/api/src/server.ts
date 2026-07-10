import Fastify from "fastify";
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";

import { userRoutes } from "./modules/users/presentation/routes/user.routes";
import { createUserController } from "./core/container";

const app = Fastify()
    .withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(async (instance) => {
    await userRoutes(instance, createUserController);
});

try {
    const address = await app.listen({ port: 3000 });
    console.log(`Server is running on ${address}`);
} catch (err) {
    console.error(err);
    process.exit(1);
}
