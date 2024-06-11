// Imports
import { Hono } from "hono";

import { emailLoginAuth } from "../schemas/auth.schema";
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
		return c.json({success: true, message: "Access Granted"});
	});

