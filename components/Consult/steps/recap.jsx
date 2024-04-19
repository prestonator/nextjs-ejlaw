"use client";
import dynamic from "next/dynamic";
import { useMemo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/components/Consult/styles/FormStyles.module.css";
import useFormStore from "@/store/useFormStore";
const Button = dynamic(() => import("@/components/Buttons/FormButton/Button"));
const DisplayField = dynamic(() =>
	import("@/components/Consult/inputs/DisplayField")
);

export default function RecapPage({ goToPreviousStep }) {
	// State to manage loading and error states
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Retrieve the form data from the global state
	const { stepOne, stepTwo, stepThree } = useFormStore();

	// Memoize the default values for useForm to prevent unnecessary re-renders
	const defaultValues = useMemo(
		() => ({ ...stepOne, ...stepTwo, ...stepThree }),
		[stepOne, stepTwo, stepThree]
	);

	const methods = useForm({
		mode: "onTouched",
		defaultValues,
	});
	const { handleSubmit } = methods;

	// Memoize the form submission logic using useCallback
	const onSubmit = useCallback(
		async (data) => {
			setIsSubmitting(true);
			setSubmitError(null);

			try {
				const response = await fetch(
					"https://n8n.do.prestonator.com/webhook/12cd7931-872b-400f-a05b-177bf8181a86",
					{
						method: "POST",
						headers: {},
						body: JSON.stringify({ stepOne, stepTwo, stepThree }),
					}
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				// Handle success - you might want to redirect the user or show a success message
				console.log("Form submitted successfully");
				setIsSubmitted(true);
			} catch (error) {
				console.error("Failed to submit the form:", error);
				setSubmitError(error.message);
			} finally {
				setIsSubmitting(false);
			}
		},
		[stepOne, stepTwo, stepThree]
	);

	// Memoize the retrieved form data using useMemo
	const formData = useMemo(
		() => ({ stepOne, stepTwo, stepThree }),
		[stepOne, stepTwo, stepThree]
	);

	// If the form has been submitted, show the "Thank You" message
	if (isSubmitted) {
		return (
			<section id="formSubmitted">
				<h1 className="mb-6 font-light text-center">Thank You!</h1>
				<p className="text-center">
					Your request has been received, and we will be in touch soon.
				</p>
			</section>
		);
	}

	return (
		<section>
			<h1 className="mb-6 font-light text-center">Recap</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`${styles.customForm}`}
			>
				<div>
					<fieldset>
						<legend>Step 1</legend>
						<DisplayField label="First Name" value={formData.stepOne.fname} />
						<DisplayField label="Last Name" value={formData.stepOne.lname} />
						<DisplayField label="Email" value={formData.stepOne.email} />
						<DisplayField label="Phone" value={formData.stepOne.phone} />
					</fieldset>
					<fieldset>
						<legend>Step 2</legend>
						<DisplayField
							label="Day Preference"
							value={formData.stepTwo.day_preference}
						/>
						<DisplayField
							label="Time Preference"
							value={formData.stepTwo.time_preference}
						/>
					</fieldset>
					<fieldset>
						<legend>Step 3</legend>
						<DisplayField
							label="Type of Legal Issue"
							value={formData.stepThree.issue_type}
						/>
						<DisplayField
							label="Brief Description"
							value={formData.stepThree.brief_description}
						/>
						<DisplayField
							label="County"
							value={formData.stepThree.issue_county}
						/>
						<DisplayField
							label="Understands Retainer"
							value={formData.stepThree.user_understands ? "Yes" : "No"}
						/>
					</fieldset>
					<div className="flex justify-around">
						<Button type="button" onClick={goToPreviousStep}>
							Go Back
						</Button>
						<Button id="formSubmitButton" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Request Consult"}
						</Button>
					</div>
					{submitError && <p>Error: {submitError}</p>}
				</div>
			</form>
		</section>
	);
}
