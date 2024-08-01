"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/components/Consult/styles/FormStyles.module.css";
import useFormStore from "@/store/useFormStore";
import { stepThreeSchema } from "../schemas/stepThreeSchema";
import { counties } from "@/components/Consult/data";
const Button = dynamic(() => import("@/components/Buttons/FormButton/Button"));
const Select = dynamic(() => import("@/components/Consult/inputs/Select"));
const CustomSelect = dynamic(() =>
	import("@/components/Consult/inputs/ReactSelect"));
const TextArea = dynamic(() => import("@/components/Consult/inputs/TextArea"));
const ToggleSwitch = dynamic(() =>
	import("@/components/Consult/inputs/ToggleSwitch")
);

// Memoized StepThreeForm component
const StepThreeForm = React.memo(({ onSubmit, goToPreviousStep }) => {
	const { stepThree } = useFormStore();

	const methods = useForm({
		mode: "onTouched",
		resolver: zodResolver(stepThreeSchema),
		defaultValues: stepThree || {
			issue_type: "",
			brief_description: "",
			issue_county: "",
			user_understands: false,
		},
	});

	return (
		<FormProvider {...methods}>
			<div
				onSubmit={methods.handleSubmit(onSubmit)}
				className={`${styles.customForm}`}
			>
				<Select
					id="issue_type"
					label="Type of Legal Issue"
					placeholder="Choose the type of legal issue"
				>
					<option value="criminal">Criminal Law</option>
					<option value="family">Family Law</option>
					<option value="injury">Personal Injury Law</option>
					<option value="expungement">Expungements</option>
					<option value="other">Other</option>
				</Select>
				<TextArea
					id="brief_description"
					label="Please provide a brief description of your legal issue"
					maxLength={400}
				/>
				<CustomSelect
					id="issue_county"
					options={counties}
					label="Please choose the county the Issue took place in"
					placeholder="Please Select County"
				/>
				<ToggleSwitch
					id="user_understands"
					label="I understand a retainer* will be required if I hire this firm."
					helperText="A retainer is an upfront cost to secure legal services and will be applied to your bill for provided services."
				/>
				<div className={`flex justify-around ${styles.buttonContainer}`}>
					<Button onClick={goToPreviousStep}>Go Back</Button>
					<Button type="button" onClick={methods.handleSubmit(onSubmit)}>
						Next
					</Button>
				</div>
			</div>
		</FormProvider>
	);
});

StepThreeForm.displayName = "StepThreeForm";

export default function StepThreePage({ goToNextStep, goToPreviousStep }) {
	const [submissionError, setSubmissionError] = useState(null);
	const { setData } = useFormStore();

	const onSubmit = async (data) => {
		try {
			await setData({ step: 3, data });
			goToNextStep();
		} catch (error) {
			setSubmissionError(
				"There was an error submitting the form. Please try again."
			);
			console.error("Form submission error:", error);
		}
	};

	return (
		<section>
			<h1 className="mb-6 font-light text-center">Step 3 - Case Information</h1>
			{submissionError && <p>{submissionError}</p>}
			<StepThreeForm onSubmit={onSubmit} goToPreviousStep={goToPreviousStep} />
		</section>
	);
}
