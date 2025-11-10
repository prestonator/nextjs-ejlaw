// app/api/submit-case-evaluation/route.js

import { NextResponse } from "next/server";

// Helper function to validate the request body (no changes needed here)
function validateRequestBody(body) {
  // ... (your existing validation logic)
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

// 1. New helper function to verify the Cloudflare Turnstile token
async function verifyTurnstileToken(token) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error(
      "TURNSTILE_SECRET_KEY is not defined in environment variables"
    );
    return { success: false, message: "Server configuration error." };
  }

  const verificationUrl =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  try {
    const response = await fetch(verificationUrl, {
      method: "POST",
      body,
    });

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      // Log the error codes for debugging
      console.error("Turnstile verification failed:", data["error-codes"]);
      return {
        success: false,
        message: "Invalid CAPTCHA token. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return {
      success: false,
      message: "Error verifying CAPTCHA. Please check your connection.",
    };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // 2. Extract the token and the form data from the request body
    const token = body["cf-turnstile-response"];
    const formData = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      county: body.county,
      caseDescription: body.caseDescription,
    };

    if (!token) {
      return NextResponse.json(
        { success: false, message: "CAPTCHA token is missing." },
        { status: 400 }
      );
    }

    // 3. Verify the token with Cloudflare
    const verificationResult = await verifyTurnstileToken(token);
    if (!verificationResult.success) {
      return NextResponse.json(
        { success: false, message: verificationResult.message },
        { status: 401 } // 401 Unauthorized is a good status for failed auth/verification
      );
    }

    // 4. Proceed with your existing logic ONLY if verification is successful
    const validationError = validateRequestBody(formData);
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_URL;
    if (!webhookUrl) {
      console.error("Webhook URL is not defined in environment variables");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // Send only the form data to n8n
    });

    if (!webhookResponse.ok) {
      throw new Error(
        `Webhook responded with status: ${webhookResponse.status}`
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
