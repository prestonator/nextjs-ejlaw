"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepTwoSchema } from "@/lib/yup";
import Select from "@/components/Consult/inputs/Select";
import Button from "@/components/Buttons/FormButton/Button";

// Memoized StepTwoForm component
const StepTwoForm = React.memo(({ onSubmit, goToPreviousStep }) => {
	const { stepTwo } = useFormStore();
	const methods = useForm({
		mode: "onTouched",
		resolver: yupResolver(stepTwoSchema),
		defaultValues: stepTwo || {
			day_preference: "",
			time_preference: "",
		},
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="customForm">
				<Select
					id="day_preference"
					label="Which day works best for you?"
					placeholder="Select preferred day"
					aria-label="Select preferred day"
				>
					<option value="no_day">No Preference</option>
					<option value="M">Monday</option>
					<option value="Tu">Tuesday</option>
					<option value="W">Wednesday</option>
					<option value="Th">Thursday</option>
					<option value="F">Friday</option>
				</Select>
				<Select
					id="time_preference"
					label="Which time works best for you?"
					placeholder="Select preferred time"
					aria-label="Select preferred time"
				>
					<option value="no_time">No Preference</option>
					<option value="morning">Morning (8AM - 12PM)</option>
					<option value="afternoon">Afternoon (12PM - 5PM)</option>
				</Select>
				<div className="flex justify-around">
					<Button type="button" onClick={goToPreviousStep}>
						Go Back
					</Button>
					<Button type="submit">Next</Button>
				</div>
			</form>
		</FormProvider>
	);
});

StepTwoForm.displayName = "StepTwoForm";

export default function StepTwoPage({ goToNextStep, goToPreviousStep }) {
	const [submissionError, setSubmissionError] = useState(null);
	const { setData } = useFormStore();

	const onSubmit = async (data) => {
		try {
			await setData({ step: 2, data });
			goToNextStep();
		} catch (error) {
			setSubmissionError(
				"There was an error submitting the form. Please try again."
			);
			console.error("Form submission error:", error);
		}
	};

	return (
		<>
			<main>
				<section className="bg-gray-100">
					<article className="min-h-screen py-16 layout">
						<h1 className="mb-6 font-light text-center">
							When are you available to schedule an appointment?
						</h1>
						{submissionError && (
							<p className="text-red-500">{submissionError}</p>
						)}
						<StepTwoForm
							onSubmit={onSubmit}
							goToPreviousStep={goToPreviousStep}
						/>
					</article>
				</section>
			</main>
		</>
	);
}
