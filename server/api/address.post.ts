import z from "zod";
import { db } from "~~/prisma/db";

const bodySchema = z.object({
  displayName: z.string().min(1),
  lat: z.number(),
  long: z.number(),
});

export default defineEventHandler(async (event) => {
  const parse = await readValidatedBody(event, bodySchema.safeParse);
  if (!parse.success) {
    return sendError(
      event,
      createError({ statusCode: 422, statusMessage: "Invalid request body" })
    );
  }
  const address = await db.address.create({ data: parse.data });
  return address;
});
