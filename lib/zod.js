import z from "zod";

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
