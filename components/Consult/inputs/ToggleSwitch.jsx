import { useFormContext } from "react-hook-form";
import "@/components/Consult/styles/ToggleSwitch.css";
import { HiExclamationCircle } from "react-icons/hi";
import { IoIosHelpCircleOutline } from "react-icons/io";

export default function ToggleSwitch({
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
				<div className="tooltip-container">
					{label}
					<div className="tooltip">
						<IoIosHelpCircleOutline />
						<span className="tooltip-text">{helperText}</span>
					</div>
				</div>
				<div className="toggle-switch">
					<input
						id={id}
						{...register(id, validation)}
						{...rest}
						type="checkbox"
						className="toggle-switch-checkbox"
					/>
					<label className="toggle-switch-label" htmlFor={id}>
						<span className="toggle-switch-inner" data-yes="Yes" data-no="No" />
						<span className="toggle-switch-switch" />
					</label>
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
		</div>
	);
}
