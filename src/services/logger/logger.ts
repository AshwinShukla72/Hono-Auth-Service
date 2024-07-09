import chalk from 'chalk';
import type { MiddlewareHandler } from 'hono';

export const customLogger: MiddlewareHandler = async (c, next) => {
	const {
		req: { method, url },
	} = c;
	let body;
	try {
		body = await c.req.json();
	} catch (err) {
		body = null; // If the body is not JSON, set it to null
	}
	const headers = await c.req.header();
	console.log(`${chalk.blue(method)} ${chalk.yellow(url)}`);
	console.log(`Headers: ${chalk.green(JSON.stringify(headers, null, 2))}\n`);
	console.log(`Query: ${chalk.blue(JSON.stringify(c.req.query(), null, 2))}`);
	console.log(`Body: ${chalk.cyan(JSON.stringify(body ?? {}, null, 2))}`);
	await next();
};
