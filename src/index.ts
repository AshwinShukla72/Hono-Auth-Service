import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";
import { showRoutes } from "hono/dev";
const app = new Hono();

app.use("*", logger());

const appRoutes = app.basePath("api").route("/auth", authRoute);
showRoutes(appRoutes, {});
export default app;
