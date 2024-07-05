import { z } from 'zod';

export const emailLoginAuth = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
		message: 'Password should contain atleast 8 characters, atleast 1 number and 1 special character',
	}),
});

export const registrationSchema = z
	.object({
		email: z.string().email('Invalid email'),
		firstName: z.string().min(1, 'First name cannot be a single character').max(80, 'First name character limit exceeded'),
		lastName: z.string().min(1, 'Last name cannot be a single character').max(80, 'Last name character limit exceeded'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long.')
			.max(50, 'Password character limit exceeded, max characters: 50')
			.regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
				message: 'Password should contain atleast 8 characters, atleast 1 number and 1 special character',
			}),
		confirmPassword: z
			.string()
			.min(8, 'Confirmation Password must be at least 8 characters long.')
			.max(50, 'Confirmation Password character limit exceeded, max characters: 50')
			.regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
				message: 'Confirmation Password should contain atleast 8 characters, atleast 1 number and 1 special character',
			}),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		path: ['confirmPassword'],
		message: "Passwords don't match",
	});
