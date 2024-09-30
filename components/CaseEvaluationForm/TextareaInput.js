// app/components/CaseEvaluationForm/TextareaInput.js
import { Textarea } from "@/components/ui/textarea";

export default function TextareaInput({
	label,
	id,
	register,
	errors,
	rows = 4,
	placeholder,
}) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<Textarea
				id={id}
				{...register(id)}
				rows={rows}
				aria-invalid={errors.id ? "true" : "false"}
				aria-describedby={errors.id ? `${id}-error` : undefined}
				className="mt-1 box-border"
				placeholder={placeholder}
			/>
			{errors[id] && (
				<p id={`${id}-error`} className="mt-1 text-sm text-red-600">
					{errors[id].message}
				</p>
			)}
		</div>
	);
}
