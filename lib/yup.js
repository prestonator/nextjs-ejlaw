/**
 * Yup schema validation objects for form steps.
 *
 * Exports 3 schema objects for validating each step of a multi-step form:
 *
 * - stepOneSchema: Validates required first name, last name, email and phone.
 *
 * - stepTwoSchema: Validates required day and time preferences.
 *
 * - stepThreeSchema: Validates required issue type, description, county,
 *   and agreement to terms.
 */
import * as yup from "yup";
import "yup-phone-lite";

export const stepOneSchema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Last Name is required"),
    email: yup
        .string()
        .email("Need to be a valid email")
        .required("Email is required"),
    phone: yup
        .string()
        .phone("US", "Please enter a valid phone number")
        .required("Phone is required"),
});

export const stepTwoSchema = yup.object().shape({
    day_preference: yup.string().required("Please select your day preference!"),
    time_preference: yup.string().required("Please select your time preference!"),
});

export const stepThreeSchema = yup.object().shape({
    issue_type: yup.string().required("Issue Type is required"),
    brief_description: yup
        .string()
        .required("Please provide a brief description of the issue"),
    issue_county: yup.string().required("County is required"),
    user_understands: yup
        .boolean()
        .required("Please read and understand the terms"),
});
