// Imports
import { Hono } from "hono";

import { emailLoginAuth, registrationSchema } from "../schemas/auth.zodschema";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

export const authRoute = new Hono()
	.post("/login", zValidator("json", emailLoginAuth), async (c) => {
		// c.req.json() returns a promise so, we have to the response
		const body = await c.req.json();
		if (!body) throw new HTTPException(400, { message: "Invalid Data" });

		const { email, password } = body;
		if (!email || !password) {
			throw new HTTPException(400, { message: "Password or Email not shared" });
		}
		if (password) {
			throw new HTTPException(401, { message: "Unauthorized" });
		}
		return c.json({ success: true, message: "Access Granted" });
	}).post("/register", zValidator("json", registrationSchema), async (c) => {
		try {
			const body = await c.req.json()
			if (!body) throw new HTTPException(400, { message: "Invalid Data" })

			// hash the password
			const hash = await Bun.password.hash(body.password, {
				algorithm: "bcrypt",
				cost: 4
			});
			// Verify match
			const isMatch = await Bun.password.verify(body.password, hash)
			if (!isMatch) {
				throw new HTTPException(500, { message: "Something went wrong" })
			}
			console.log(body.password, hash, isMatch)

			return c.json({ success: true, message: "Registration Successful" })
		} catch (error) {
			return c.json({ error: true, message: "Something went wring" })
		}
	})

