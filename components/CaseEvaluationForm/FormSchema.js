// app/components/CaseEvaluationForm/FormSchema.js

import { z } from "zod";

export const formSchema = z.object({
	fullName: z
		.string()
		.min(2, { message: "Full name must be at least 2 characters." }),
	email: z.string().email({ message: "Invalid email address." }),
	phone: z
		.string()
		.regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
	county: z.string().min(1, { message: "Please select a county." }),
	caseDescription: z
		.string()
		.min(10, { message: "Case description must be at least 10 characters." })
		.max(500, { message: "Case description must not exceed 500 characters." }),
});
