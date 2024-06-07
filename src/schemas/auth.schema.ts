import { z } from "zod";

export const authSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8)
		// .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{8,}$/, {
		// 	message:
		// 		"Minimum of 8 characters, atleast 1 number, atleast 1 special character, and no Uppercase characters",
		// }),
});
