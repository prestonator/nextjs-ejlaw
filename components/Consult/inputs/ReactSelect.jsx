"use client";
import Select from "react-select";
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
		<div>
			<label htmlFor={id}>{label}</label>
			<Controller
				control={control}
				rules={validation}
				defaultValue={defaultValue}
				name={id}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<div className={`w-full`}>
							<Select
								name={id}
								onChange={(selectedOption) =>
									onChange(selectedOption ? selectedOption.value : null)
								}
								onBlur={onBlur}
								value={options.find((option) => option.value === value)}
								id={id}
								options={options}
								placeholder={placeholder}
								isDisabled={readOnly}
								className="react-select-container [&>div:first-of-type]:bg-transparent [&>div:first-of-type]:border-opacity-100 [&>div:first-of-type]:border-black"
								classNamePrefix="react-select"
								isSearchable={true}
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
