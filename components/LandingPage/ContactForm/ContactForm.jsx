"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import * as z from "zod";

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
						<span className="font-medium">Case Description:</span>
						{data.caseDescription}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default function LandingPageForm() {
	const [formStatus, setFormStatus] = useState({
		success: false,
		message: null,
		data: null,
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data) => {
		try {
			const response = await fetch(
				"https://n8n.do.prestonator.com/webhook/f9950bbd-6a01-4316-844f-d5834dbb2d9e",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) throw new Error("Failed to submit form");

			setFormStatus({
				success: true,
				message: "Form submitted successfully!",
				data,
			});
		} catch (error) {
			setFormStatus({
				success: false,
				message: "An error occurred. Please try again.",
				data: null,
			});
		}
	};

	return (
		<>
			{formStatus.success && formStatus.data ? (
				<ThankYouMessage data={formStatus.data} />
			) : (
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold text-gray-900 mb-6 font-fancy">
						Schedule Your Case Evaluation
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label
								htmlFor="fullName"
								className="block text-sm font-medium text-gray-700"
							>
								Full Name
							</label>
							<Input
								id="fullName"
								{...register("fullName")}
								className="mt-1 box-border"
							/>
							{errors.fullName && (
								<p className="text-red-500 text-sm mt-1">
									{errors.fullName.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<Input
								id="email"
								type="email"
								{...register("email")}
								className="mt-1 box-border"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700"
							>
								Phone
							</label>
							<Input
								id="phone"
								type="tel"
								{...register("phone")}
								className="mt-1 box-border"
							/>
							{errors.phone && (
								<p className="text-red-500 text-sm mt-1">
									{errors.phone.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="caseDescription"
								className="block text-sm font-medium text-gray-700"
							>
								Brief Case Description
							</label>
							<Textarea
								id="caseDescription"
								{...register("caseDescription")}
								rows={3}
								className="mt-1 box-border"
								placeholder="Please provide a brief description of your case..."
							/>
							{errors.caseDescription && (
								<p className="text-red-500 text-sm mt-1">
									{errors.caseDescription.message}
								</p>
							)}
						</div>
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
