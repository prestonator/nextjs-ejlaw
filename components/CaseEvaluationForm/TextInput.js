// app/components/CaseEvaluationForm/TextInput.js
import { Input } from "@/components/ui/input";
export default function TextInput({
	label,
	id,
	register,
	errors,
	type = "text",
}) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<Input
				type={type}
				id={id}
				{...register(id)}
				aria-invalid={errors.id ? "true" : "false"}
				aria-describedby={errors.id ? `${id}-error` : undefined}
				className="mt-1 box-border"
			/>
			{errors[id] && (
				<p id={`${id}-error`} className="mt-1 text-sm text-red-600">
					{errors[id].message}
				</p>
			)}
		</div>
	);
}
