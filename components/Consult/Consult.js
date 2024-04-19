"use client"
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import { Steps, stepOrder } from "./constants";
const StepOnePage = dynamic(() => import("./steps/step-1"));
const StepTwoPage = dynamic(() => import("./steps/step-2"));
const StepThreePage = dynamic(() => import("./steps/step-3"));
const RecapPage = dynamic(() => import("./steps/recap"));

const ConsultForm = () => {
    // State to keep track of the current step
    const [currentStep, setCurrentStep] = useState(Steps.STEP_1);

    // Function to move to the next step
    const goToNextStep = () => {
        const currentStepIndex = stepOrder.indexOf(currentStep);
        const nextStep = stepOrder[currentStepIndex + 1];

        if (nextStep) {
            setCurrentStep(nextStep);
        } else {
            console.error('Attempted to go to next step but none was found.');
        }
    };

    // Function to move to the previous step
    const goToPreviousStep = () => {
        const currentStepIndex = stepOrder.indexOf(currentStep);
        const prevStep = stepOrder[currentStepIndex - 1];

        if (prevStep) {
            setCurrentStep(prevStep);
        } else {
            console.error('Attempted to go to previous step but none was found.');
        }
    };

    // Render the appropriate component based on the current step
    const renderStep = () => {
        switch (currentStep) {
            case Steps.STEP_1:
                return <StepOnePage goToNextStep={goToNextStep} />;
            case Steps.STEP_2:
                return <StepTwoPage goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
            case Steps.STEP_3:
                return <StepThreePage goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />;
            case Steps.RECAP:
                return <RecapPage goToPreviousStep={goToPreviousStep} />;
            case Steps.COMPLETED:
                return <div>Form completed!</div>;
            default:
                console.error(`Invalid step: ${currentStep}`);
                return <div>Invalid step</div>;
        }
    };

    return (
        <div className='px-2 py-4'>
            {renderStep()}
        </div>
    );
}

export default ConsultForm;