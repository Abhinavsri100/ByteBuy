/** @format */


import * as Yup from "yup";
export const signupSchema = Yup.object({
  firstName: Yup.string().min(2).required("Please enter your firstName"),
  lastName: Yup.string().min(2).required("Please enter your lastName"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(9)
    .max(15)
    .required()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Email must contain at least one number and one special character"
    ),
});
export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(9)
    .max(15)
    .required()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Email must contain at least one number and one special character"
    ),
});
