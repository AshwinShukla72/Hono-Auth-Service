import chalk from 'chalk';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { logger } from 'hono/logger';
import { authRoute } from './routes/auth';

const app = new Hono().basePath('api');

app.use(async (c, next) => {
	const {
		req: { method, url },
	} = c;
	console.log(`${chalk.blue(method)} ${chalk.yellow(url)}`);
	await next();
});

const appRoutes = app.route('/auth', authRoute);
showRoutes(appRoutes, {});
export default app;
