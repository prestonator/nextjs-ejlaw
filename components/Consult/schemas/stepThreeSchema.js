import z from "zod";

export const stepThreeSchema = z.object({
	issue_type: z.string({
		required_error: "Issue Type is required",
		invalid_type_error: "Invalid Type!",
	}),
	brief_description: z.string({
		required_error: "Please provide a brief description of the issue",
		invalid_type_error: "Invalid Entry!",
	}),
	issue_county: z.string({
		required_error: "County is required",
		invalid_type_error: "Invalid County!",
	}),
	user_understands: z.boolean({
		required_error: "Please read and understand the terms",
		invalid_type_error: "Invalid Entry!",
	}),
});