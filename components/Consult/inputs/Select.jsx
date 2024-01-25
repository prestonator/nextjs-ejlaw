/**
 * Select component renders a select input with label, placeholder, validation,
 * and error handling. It provides read-only state, helper text, and dynamic options.
 * Accepts label, helperText, id, placeholder, readOnly, children, validation props.
 * Uses react-hook-form for validation and error handling.
 * Renders disabled, selected options if readOnly.
 * Shows error icon and message on validation error.
 */
"use client";
import { Children, cloneElement, isValidElement } from "react";
import { useFormContext } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";

export default function Select({
	label,
	helperText,
	id,
	placeholder,
	readOnly = false,
	children,
	validation,
	...rest
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	// Add disabled and selected attribute to option, will be used if readonly
	const readOnlyChildren = Children.map(children, (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, {
				disabled: child.props.value !== rest?.defaultValue,
				// selected: child.props.value === rest?.defaultValue,
			});
		}
	});

	return (
		<div className="customInput">
			<label htmlFor={id}>{label}</label>
			<div>
				<select
					{...register(id, validation)}
					// defaultValue to value blank, will get overriden by ...rest if needed
					defaultValue=""
					{...rest}
					name={id}
					id={id}
					aria-describedby={id}
				>
					{placeholder && (
						<option value="" disabled hidden>
							{placeholder}
						</option>
					)}
					{readOnly ? readOnlyChildren : children}
				</select>

				{errors[id] && (
					<div>
						<HiExclamationCircle />
					</div>
				)}
			</div>
			<div>
				{helperText && <p>{helperText}</p>}
				{errors[id] && <span>{errors[id].message}</span>}
			</div>
		</div>
	);
}
