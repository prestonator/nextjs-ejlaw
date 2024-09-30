// app/api/submit-case-evaluation/route.js

import { NextResponse } from "next/server";

// Helper function to validate the request body
function validateRequestBody(body) {
	const requiredFields = [
		"fullName",
		"email",
		"phone",
		"county",
		"caseDescription",
	];
	for (const field of requiredFields) {
		if (!body[field]) {
			return `Missing required field: ${field}`;
		}
	}
	return null;
}

export async function POST(request) {
	try {
		// Parse the request body
		const body = await request.json();

		// Validate the request body
		const validationError = validateRequestBody(body);
		if (validationError) {
			return NextResponse.json(
				{ success: false, message: validationError },
				{ status: 400 }
			);
		}

		// Get the webhook URL from environment variables
		const webhookUrl = process.env.NEXT_PUBLIC_N8N_URL;
		if (!webhookUrl) {
			console.error("Webhook URL is not defined in environment variables");
			return NextResponse.json(
				{ success: false, message: "Server configuration error" },
				{ status: 500 }
			);
		}

		// Send the data to the webhook
		const webhookResponse = await fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!webhookResponse.ok) {
			throw new Error(
				`Webhook responded with status: ${webhookResponse.status}`
			);
		}

		// Return a success response
		return NextResponse.json(
			{ success: true, message: "Form submitted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing form submission:", error);

		// Return an error response
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while processing your request",
			},
			{ status: 500 }
		);
	}
}

// Optionally, you can add a GET handler to return a 405 Method Not Allowed for any GET requests
export async function GET() {
	return NextResponse.json(
		{ success: false, message: "Method not allowed" },
		{ status: 405 }
	);
}
