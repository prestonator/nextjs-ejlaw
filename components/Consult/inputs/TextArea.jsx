"use client";
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
import styles from "@/components/Consult/styles/FormStyles.module.css";

export default function TextArea({
	label,
	placeholder = "",
	helperText,
	id,
	readOnly = false,
	validation,
	rows = 3,
	maxLength = 350, // Set the default maxLength if not provided
	minLength = 1, // Added minLength prop
	...rest
}) {
	// Get register and errors from React Hook Form
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();

	// Use the watch function to monitor the value of the textarea
	const value = watch(id);

	// Calculate remaining characters
	const remainingChars = maxLength - (value?.length || 0);

	return (
		<div className={`${styles.customInput}`}>
			<label htmlFor={id}>{label}</label>
			<div>
				<textarea
					// Register the field with validation, maxLength and minLength
					{...register(id, {
						...validation,
						maxLength,
						minLength: {
							value: minLength,
							message: "Please enter something", // Added error text
						},
					})}
					{...rest}
					id={id}
					name={id}
					readOnly={readOnly}
					rows={rows}
					placeholder={placeholder}
					aria-describedby={`${id}-helper-text`}
					maxLength={maxLength} // Set the maxLength attribute
					style={{ width: "100%" }}
				/>

				{errors[id] && (
					// Show error icon if there is an error
					<div>
						<HiExclamationCircle />
					</div>
				)}
			</div>
			<div id={`${id}-helper-text`}>
				{helperText && (
					// Show helper text if provided
					<p>{helperText}</p>
				)}
				{errors[id] && (
					// Show error message text if there is an error
					<span>{errors[id].message}</span>
				)}
				{/* Display remaining characters */}
				<span style={{ color: remainingChars === 0 ? "red" : "inherit" }}>
					{remainingChars} characters left
				</span>
			</div>
		</div>
	);
}
