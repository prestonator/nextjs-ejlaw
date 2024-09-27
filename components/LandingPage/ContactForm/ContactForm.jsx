"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import * as z from "zod";

// Define the form schema using Zod
const formSchema = z.object({
	fullName: z
		.string()
		.min(2, { message: "Full name must be at least 2 characters." }),
	email: z.string().email({ message: "Invalid email address." }),
	phone: z
		.string()
		.regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
	caseDescription: z
		.string()
		.min(10, { message: "Case description must be at least 10 characters." })
		.max(500, { message: "Case description must not exceed 500 characters." }),
});

// Reusable FormField component
function FormField({ id, label, register, error, type = "text", ...rest }) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<Input
				id={id}
				type={type}
				{...register(id)}
				{...rest}
				className="mt-1 box-border"
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}

// Reusable TextareaField component
function TextareaField({ id, label, register, error, ...rest }) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<Textarea
				id={id}
				{...register(id)}
				{...rest}
				className="mt-1 box-border"
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}

// ThankYouMessage component with typed data
function ThankYouMessage({ data }) {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg text-center">
			<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
			<h2 className="text-2xl font-bold text-gray-900 mb-4">
				Thank You for Reaching Out!
			</h2>
			<p className="text-gray-600 mb-6">
				We've received your information and will contact you shortly.
			</p>
			<div className="bg-gray-50 p-6 rounded-md text-left">
				<h3 className="text-lg font-semibold text-gray-900 mb-3">
					Your Submission Summary:
				</h3>
				<ul className="space-y-2 text-gray-900 list-none">
					<li>
						<span className="font-medium">Name:</span> {data.fullName}
					</li>
					<li>
						<span className="font-medium">Email:</span> {data.email}
					</li>
					<li>
						<span className="font-medium">Phone:</span> {data.phone}
					</li>
					<li>
						<span className="font-medium">Case Description:</span> {data.caseDescription}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default function LandingPageForm() {
	const [submittedData, setSubmittedData] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		setError,
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data) => {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_N8N_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			setSubmittedData(data);
			reset();
		} catch (error) {
			setError("root.serverError", {
				type: "manual",
				message: "An error occurred. Please try again.",
			});
		}
	};

	return (
		<>
			{isSubmitSuccessful && submittedData ? (
				<ThankYouMessage data={submittedData} />
			) : (
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold text-gray-900 mb-6 font-fancy">
						Schedule Your Case Evaluation
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							id="fullName"
							label="Full Name"
							register={register}
							error={errors.fullName?.message}
						/>
						<FormField
							id="email"
							label="Email"
							type="email"
							register={register}
							error={errors.email?.message}
						/>
						<FormField
							id="phone"
							label="Phone"
							type="tel"
							register={register}
							error={errors.phone?.message}
						/>
						<TextareaField
							id="caseDescription"
							label="Brief Case Description"
							rows={3}
							register={register}
							error={errors.caseDescription?.message}
							placeholder="Please provide a brief description of your case..."
						/>
						{errors.root?.serverError && (
							<p className="text-red-500 text-sm mt-1">
								{errors.root.serverError.message}
							</p>
						)}
						<Button
							type="submit"
							className="w-full font-special"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Request Consultation"}
						</Button>
					</form>
					<p className="mt-4 text-xs text-gray-500 text-center">
						Your information is kept confidential and protected.
					</p>
				</div>
			)}
		</>
	);
}
