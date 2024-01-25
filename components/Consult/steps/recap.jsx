"use client";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import useFormStore from "@/store/useFormStore";
import Button from "@/components/Buttons/FormButton/Button";

// Helper function to display form data as text
const DisplayField = ({ label, value }) => (
	<div>
		<strong>{label}:</strong> {value}
	</div>
);

export default function RecapPage({ goToPreviousStep }) {
	// State to manage loading and error states
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission status
	// Retrieve the form data from the global state
	const { stepOne, stepTwo, stepThree } = useFormStore();

	// Memoized default values for useForm to prevent unnecessary re-renders
	const defaultValues = useMemo(
		() => ({ ...stepOne, ...stepTwo, ...stepThree }),
		[stepOne, stepTwo, stepThree]
	);

	const methods = useForm({
		mode: "onTouched",
		defaultValues,
	});
	const { handleSubmit } = methods;

	// Improved error handling in onSubmit
	const onSubmit = async (data) => {
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
			// If the request is successful, set isSubmitted to true
			setIsSubmitted(true);
		} catch (error) {
			console.error("Failed to submit the form:", error);
			setSubmitError(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	// If the form has been submitted, show the "Thank You" message
	if (isSubmitted) {
		return (
			<main>
				<section>
					<article>
						<h1 className="mb-6 font-light text-center">Thank You!</h1>
						<p className="text-center">Your request has been received, and we will be in touch soon.</p>
					</article>
				</section>
			</main>
		);
	}

	return (
		<main>
			<section>
				<article>
					<h1 className="mb-6 text-center">Recap</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="customForm">
						<div>
							<fieldset>
								<legend>Step 1</legend>
								<DisplayField label="First Name" value={stepOne.fname} />
								<DisplayField label="Last Name" value={stepOne.lname} />
								<DisplayField label="Email" value={stepOne.email} />
								<DisplayField label="Phone" value={stepOne.phone} />
							</fieldset>
							<fieldset>
								<legend>Step 2</legend>
								<DisplayField
									label="Day Preference"
									value={stepTwo.day_preference}
								/>
								<DisplayField
									label="Time Preference"
									value={stepTwo.time_preference}
								/>
							</fieldset>
							<fieldset>
								<legend>Step 3</legend>
								<DisplayField
									label="Type of Legal Issue"
									value={stepThree.issue_type}
								/>
								<DisplayField
									label="Brief Description"
									value={stepThree.brief_description}
								/>
								<DisplayField label="County" value={stepThree.issue_county} />
								<DisplayField
									label="Understands Retainer"
									value={stepThree.user_understands ? "Yes" : "No"}
								/>
							</fieldset>
							<div className="flex justify-around">
								<Button type="button" onClick={goToPreviousStep}>
									Go Back
								</Button>
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Submitting..." : "Request Consult"}
								</Button>
							</div>
							{submitError && <p>Error: {submitError}</p>}
						</div>
					</form>
				</article>
			</section>
		</main>
	);
}
