/**
 * CustomSelect component renders a select input with validation and error handling using React Hook Form.
 *
 * It takes in various props like label, placeholder, options etc. and renders the select input wrapped in a Controller component from react-hook-form.
 *
 * The select input itself is rendered using the react-select-search component.
 *
 * It shows any validation errors and helper text passed in.
 *
 * Overall, this component provides an easy way to add a validated select input to a React Hook Form, with support for search/filtering.
 */
"use client";
import SelectSearch from "react-select-search";
import "@/components/Consult/styles/SelectSearch.css";
import styles from "@/components/Consult/styles/FormStyles.module.css";
import { Controller, useFormContext } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";

export default function CustomSelect({
	label,
	helperText,
	id,
	placeholder,
	readOnly = false,
	children,
	validation,
	options,
	defaultValue,
	...rest
}) {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext();

	return (
		<div className={`${styles.customSelect}`}>
			<label htmlFor={id}>{label}</label>
			<Controller
				control={control}
				rules={validation}
				defaultValue={defaultValue}
				name={id}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<div className="w-full">
							<SelectSearch
								search="true"
								name={id}
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								id={id}
								options={options}
								label={label}
								placeholder={placeholder}
								disabled={readOnly}
								{...rest}
							/>
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
					</>
				)}
			/>
		</div>
	);
}
