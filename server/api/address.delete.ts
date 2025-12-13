import z from "zod";
import { db } from "~~/prisma/db";

const bodySchema = z.object({ id: z.number() });

export default defineEventHandler(async (event) => {
  const parse = await readValidatedBody(event, bodySchema.safeParse);
  if (!parse.success) {
    return sendError(
      event,
      createError({ statusCode: 422, statusMessage: "Invalid request body" })
    );
  }
  const address = await db.address.findUnique({ where: { id: parse.data.id } });
  if (!address) {
    return sendError(
      event,
      createError({ statusCode: 404, statusMessage: "Address not found" })
    );
  }
  try {
    await db.address.delete({ where: { id: parse.data.id } });
  } catch (error) {
    console.log(error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Failed to delete address",
      })
    );
  }
  return address;
});
