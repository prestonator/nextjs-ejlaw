// app/components/CaseEvaluationForm/CaseEvaluationForm.js

"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./FormSchema";
import CountySelect from "./CountySelect";
import { useState, useEffect } from "react"; // 1. Import useEffect
import TextInput from "./TextInput";
import { Button } from "@/components/ui/button";
import TextareaInput from "./TextareaInput";
import dynamic from "next/dynamic";
import Script from "next/script";

const ThankYouMessage = dynamic(() => import("./ThankYouMessage"));

export default function CaseEvaluationForm() {
  const [submitResult, setSubmitResult] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [token, setToken] = useState("");

  // 2. Use useEffect to manage the global callback function
  useEffect(() => {
    // Define the callback function that Turnstile will call
    const onTurnstileSuccess = (token) => {
      setToken(token);
    };

    // Attach the callback function to the window object
    window.onTurnstileSuccess = onTurnstileSuccess;

    // IMPORTANT: Clean up the function from the window object when the component unmounts
    return () => {
      delete window.onTurnstileSuccess;
    };
  }, []); // The empty dependency array ensures this effect runs only once

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
        body: JSON.stringify({
          ...data,
          "cf-turnstile-response": token,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitResult({
          success: true,
          message: "Form submitted successfully!",
        });
        setSubmittedData(data);
        reset();
      } else {
        const errorResult = await response.json();
        setSubmitResult({
          success: false,
          message:
            errorResult.message ||
            "An error occurred while submitting the form.",
        });
        if (response.status === 401) {
          setToken(""); // Reset the token on verification failure
          window.turnstile.reset(); // Ask Turnstile to generate a new widget
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (isSubmitSuccessful && submittedData) {
    return <ThankYouMessage submittedData={submittedData} />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <h2 className="text-2xl font-bold text-gray-900 mb-2 font-fancy">
        Schedule Your Case Evaluation
      </h2>
      <span className="block text-md text-gray-900 mb-6 font-body">
        We will be in contact soon.
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-body">
        {/* ... your input fields are unchanged ... */}
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

        {/* 3. Pass the NAME of the global function as a string */}
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          data-callback="onTurnstileSuccess"
        />

        <Button
          type="submit"
          disabled={isSubmitting || !token}
          className="w-full font-special"
        >
          {isSubmitting ? "Submitting..." : "Request Consultation"}
        </Button>
      </form>

      {submitResult && !isSubmitSuccessful && (
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
