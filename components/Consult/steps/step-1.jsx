import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema } from "@/lib/zod";
import useFormStore from "@/store/useFormStore";
import Button from "@/components/Buttons/FormButton/Button";
import Input from "@/components/Consult/inputs/Input";
import styles from "@/components/Consult/styles/FormStyles.module.css";

// Memoized StepOneForm component
const StepOneForm = React.memo(({ onSubmit }) => {
	const { stepOne } = useFormStore();

	const methods = useForm({
		mode: "onTouched",
		resolver: zodResolver(stepOneSchema),
		defaultValues: stepOne || {
			fname: "",
			lname: "",
			email: "",
			phone: "",
		},
	});

	return (
		<FormProvider {...methods}>
			<div className={`${styles.customForm}`}>
				<Input label="First Name" id="fname" placeholder="My First Name Is" />
				<Input label="Last Name" id="lname" placeholder="My Last Name Is" />
				<Input id="email" label="Email" placeholder="My Email Is" />
				<Input id="phone" label="Phone" placeholder="My Phone Number Is" />
				<Button type="button" onClick={methods.handleSubmit(onSubmit)}>
					Next
				</Button>
			</div>
		</FormProvider>
	);
});

StepOneForm.displayName = "StepOneForm";

export default function StepOnePage({ goToNextStep }) {
	const [submissionError, setSubmissionError] = useState(null);
	const { setData } = useFormStore();

	const onSubmit = async (data) => {
		try {
			await setData({ step: 1, data });
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
			<h1 className="mb-6 font-light text-center">
				Step 1 - Contact Information
			</h1>
			{submissionError && <p>{submissionError}</p>}
			<StepOneForm onSubmit={onSubmit} />
		</section>
	);
}
