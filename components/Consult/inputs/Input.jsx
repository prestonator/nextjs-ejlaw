/**
 * Input component for forms.
 *
 * Accepts various props for configuring the input, including label, placeholder,
 * validation rules, etc.
 *
 * Uses React Hook Form for handling form state and validation.
 *
 * Renders a label, input, help text, and validation error messages.
 * Applies appropriate CSS classnames based on validation state.
 *
 * Exported as the default export.
 */
import { useFormContext } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";

export default function Input({
	label,
	placeholder = "",
	helperText,
	id,
	type = "text",
	readOnly = false,
	validation,
	...rest
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="customInput">
			<label htmlFor={id} />
			<input
				{...register(id, validation)}
				{...rest}
				type={type}
				name={id}
				id={id}
				readOnly={readOnly}
				placeholder={placeholder}
				aria-describedby={id}
			/>
			{helperText && <p>{helperText}</p>}
			{errors[id] && (
				<span>
					<HiExclamationCircle />
					{errors[id].message}
				</span>
			)}
		</div>
	);
}
