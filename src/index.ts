import { Hono } from "hono"
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";
import { showRoutes } from "hono/dev";
import { PrismaClient } from '@prisma/client'

const app = new Hono().basePath("api");

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
})

prisma.$on('query', (e) => {
  console.log(`Query: ${e.query}`)
  console.log(`Params: ${e.params}`)
  console.log(`Duration: ${e.duration}ms`)
})

app.use("*", logger());
(async () => {
  try {
    console.log("connecting to DB")
    await prisma.$connect()
  } catch (error) {
    console.log("Disconnecting from DB")
    await prisma.$disconnect()
  }
})()

const appRoutes = app.route("/auth", authRoute);
showRoutes(appRoutes, {});
export default app;
