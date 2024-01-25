"use client"
import React, { useState } from 'react';
import StepOnePage from "./steps/step-1";
import StepTwoPage from "./steps/step-2";
import StepThreePage from "./steps/step-3";
import RecapPage from "./steps/recap";

// Enum-like object for step identifiers
const Steps = {
    STEP_1: 'step-1',
    STEP_2: 'step-2',
    STEP_3: 'step-3',
    RECAP: 'recap',
    COMPLETED: 'completed'
};

const stepOrder = [
    Steps.STEP_1,
    Steps.STEP_2,
    Steps.STEP_3,
    Steps.RECAP,
    Steps.COMPLETED
];

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
        <div>
            {renderStep()}
        </div>
    );
}

export default ConsultForm;