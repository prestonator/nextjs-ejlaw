/**
 * TextArea component for forms.
 *
 * Renders a <textarea> input with label, error handling,
 * and other common form input features.
 *
 * Exports a React component.
 */
import { useFormContext } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";

export default function TextArea({
	label,
	placeholder = "",
	helperText,
	id,
	readOnly = false,
	validation,
	rows = 3,
	...rest
}) {
	// Get register and errors from React Hook Form
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="customInput">
			<label htmlFor={id}>{label}</label>
			<div>
				<textarea
					// Register the field with validation
					{...register(id, validation)}
					{...rest}
					id={id}
					name={id}
					readOnly={readOnly}
					rows={rows}
					placeholder={placeholder}
					aria-describedby={id}
					style={{ width: "100%" }}
				/>

				{errors[id] && (
					// Show error icon if there is an error
					<div>
						<HiExclamationCircle />
					</div>
				)}
			</div>
			<div>
				{helperText && (
					// Show helper text if provided
					<p>{helperText}</p>
				)}
				{errors[id] && (
					// Show error message text if there is an error
					<span>{errors[id].message}</span>
				)}
			</div>
		</div>
	);
}
