import * as z from "zod";

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const stepOneSchema = z.object({
	fname: z.string({
		required_error: "First Name is required",
		invalid_type_error: "Invalid Entry!",
	}),
	lname: z.string({
		required_error: "Last Name is required",
		invalid_type_error: "Invalid Entry!",
	}),
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Invalid Email!",
		})
		.email(),
	phone: z
		.string({
			required_error: "Phone is required",
			invalid_type_error: "Invalid Phone Number!",
		})
		.regex(phoneRegex, "Invalid Number!"),
});
