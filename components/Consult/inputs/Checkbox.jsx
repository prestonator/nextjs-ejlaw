/**
 * Checkbox component for forms.
 *
 * Accepts label, id, helperText, validation props and renders
 * a checkbox input with associated label, error message,
 * and helper text.
 *
 * Uses React Hook Form for validation and error handling.
 */
import { useFormContext } from "react-hook-form";
import { HiExclamationCircle } from "react-icons/hi";

export default function Checkbox({
	label,
	id,
	helperText,
	validation,
	...rest
}) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<div>
				<label htmlFor={id}>{label}</label>
				<div>
					<strong>
						I Understand -
						<input
							id={id}
							{...register(id, validation)}
							{...rest}
							type="checkbox"
						/>
					</strong>
				</div>
				<div>
					{errors[id] && (
						<div>
							<HiExclamationCircle />
							{errors[id].message}
						</div>
					)}
				</div>
			</div>
			{helperText && <p>{helperText}</p>}
		</div>
	);
}
