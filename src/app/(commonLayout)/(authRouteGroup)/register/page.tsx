import { RegisterForm } from "@/components/modules/Auth/Register-Form";
import { Metadata } from "next";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

export const metadata: Metadata = {
  title: "Register",
  description:
    "Browse all the delicious meals we have to offer. Sign up for an account to get started!",
};
