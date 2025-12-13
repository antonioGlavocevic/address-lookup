import { db } from "~~/prisma/db";

export default defineEventHandler(async () => {
  const addresses = await db.address.findMany();
  return addresses;
});
