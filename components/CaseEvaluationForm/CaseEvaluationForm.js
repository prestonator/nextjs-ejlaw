// app/components/CaseEvaluationForm/CaseEvaluationForm.js

"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./FormSchema";
import CountySelect from "./CountySelect";
import { useState } from "react";
import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import TextareaInput from "./TextareaInput";
import dynamic from "next/dynamic";
const ThankYouMessage = dynamic(() => import("./ThankYouMessage"));

export default function CaseEvaluationForm() {
	const [submitResult, setSubmitResult] = useState(null);
	const [submittedData, setSubmittedData] = useState(null);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			county: "",
			caseDescription: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			const response = await fetch("/api/submit-case-evaluation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const result = await response.json();
				setSubmittedData(data);
				reset();
			} else {
				const errorText = await response.text();
				setSubmitResult({
					success: false,
					message:
						errorText ||
						"An error occurred while submitting the form. Please try again later.",
				});
			}
		} catch (error) {
			console.error("Error:", error);
			setSubmitResult({
				success: false,
				message:
					"An unexpected error occurred. Please check your network connection and try again.",
			});
		}
	};

	if (isSubmitSuccessful && submittedData) {
		return <ThankYouMessage submittedData={submittedData} />;
	}

	return (
		<div className="bg-white p-8 rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold text-gray-900 mb-2 font-fancy">
				Schedule Your Case Evaluation
			</h2>
			<span className="block text-md text-gray-900 mb-6 font-body">
				We will be in contact soon.
			</span>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<TextInput
					label="Full Name"
					id="fullName"
					register={register}
					errors={errors}
				/>
				<TextInput
					label="Email"
					id="email"
					type="email"
					register={register}
					errors={errors}
				/>

				<TextInput
					label="Phone"
					id="phone"
					type="tel"
					register={register}
					errors={errors}
				/>

				<div>
					<label
						htmlFor="county"
						className="block text-sm font-medium text-gray-700"
					>
						County
					</label>
					<Controller
						name="county"
						control={control}
						render={({ field }) => (
							<CountySelect onChange={field.onChange} value={field.value} />
						)}
					/>

					{errors.county && (
						<p className="mt-1 text-sm text-red-600">{errors.county.message}</p>
					)}
				</div>

				<TextareaInput
					label="Case Description & Case Number(s) (If Applicable)"
					id="caseDescription"
					register={register}
					errors={errors}
					placeholder="Please provide a brief description of your case..."
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full font-special"
				>
					{isSubmitting ? "Submitting..." : "Request Consultation"}
				</Button>
			</form>

			{submitResult && !isSubmitted && (
				<div
					className={`mt-4 p-4 ${
						submitResult.success
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					} rounded-md`}
				>
					{submitResult.message}
				</div>
			)}
		</div>
	);
}
