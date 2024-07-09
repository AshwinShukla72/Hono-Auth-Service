import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { authRoute } from './routes/auth';
import { customLogger } from './services/logger/logger';
import { Pool } from 'pg';
import { drizzle } from "drizzle-orm/node-postgres"

const app = new Hono().basePath('api');

app.use('*', customLogger);

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "db_name",
});
pool.connect();
const db = drizzle(pool);
const appRoutes = app.route('/auth', authRoute);
showRoutes(appRoutes, {});
export default app;
