import z from "zod";

export const stepTwoSchema = z.object({
	day_preference: z.string({
		required_error: "Please select your day preference!",
		invalid_type_error: "Invalid Selection!",
	}),
	time_preference: z.string({
		required_error: "Please select your time preference!",
		invalid_type_error: "Invalid Selection!",
	}),
});