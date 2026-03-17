import { LoginForm } from "@/components/modules/Auth/Login-Form";
import { Metadata } from "next";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "Login",
  description:
    "Browse all the delicious meals we have to offer. Sign in to your account to get started!",
};
