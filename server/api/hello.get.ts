export default defineEventHandler(async () => {
  await sleep(2000);
  return {
    message: "Welcome to address lookup",
  };
});
