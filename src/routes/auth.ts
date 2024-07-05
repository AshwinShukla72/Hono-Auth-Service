import { zValidator } from '@hono/zod-validator';
// Imports
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { emailLoginAuth, registrationSchema } from '../validations/auth.schema';
export const authRoute = new Hono()
	.post('/login', zValidator('json', emailLoginAuth), async context => {
		// c.req.json() returns a promise so, we have await the response
		try {
			const body = await context.req.json();
			console.log('---------------', context);
			if (!body) throw new HTTPException(400, { message: 'Invalid Data' });

			const { email, password } = body;
			if (!email || !password) {
				throw new HTTPException(400, { message: 'Password or Email not shared' });
			}
			// find user on the basis of user email -->
			// const user = await User.find()
			// if (!user) throw new HTTPException(401, { message: "User not found" });
			if (password) {
				throw new HTTPException(401, { message: 'Unauthorized' });
			}
			return context.json({ success: true, message: 'Access Granted' });
		} catch (error) {
			throw new HTTPException(500, { message: 'Something went wrong' });
		}
	})
	.post('/register', zValidator('json', registrationSchema), async context => {
		try {
			const body = await context.req.json();

			if (!body) throw new HTTPException(400, { message: 'Invalid Data' });

			// hash the password
			const hash = await Bun.password.hash(body.password, {
				algorithm: 'bcrypt',
				cost: 4,
			});
			// Verify match
			const isMatch = await Bun.password.verify(body.password, hash);
			if (!isMatch) {
				throw new HTTPException(500, { message: 'Something went wrong' });
			}
			console.log(body.password, hash, isMatch);
			return context.json({ success: true, message: 'Registration Successful' });
		} catch (error) {
			throw new HTTPException(500, { message: 'Something went wrong' });
		}
	});
