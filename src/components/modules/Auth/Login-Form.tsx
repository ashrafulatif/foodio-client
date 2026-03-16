"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const isRegister = pathname === "/register";

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");
      try {
        // replace with your actual auth call e.g. authClient.signIn.email(value)
        console.log(value);
        toast.success("Signed in successfully!", { id: toastId });
        router.push("/");
      } catch {
        toast.error("Invalid email or password.", { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-[#FBFAF8] border-border shadow-sm rounded-3xl px-8 py-10">
        <CardContent className="p-0">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-1 h-10 w-100 relative">
              <Image src="/Logo.svg" alt="Foodio" fill />
            </div>
            <p className="text-muted-foreground text-sm">
              Premium flavors, delivered.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-[#F2EFE9] rounded-full w-full h-[44px] mb-8 p-1">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className={`flex-1 text-center text-sm font-medium py-2 rounded-full transition-all duration-200 ${
                !isRegister
                  ? "bg-white text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className={`flex-1 text-center text-sm font-medium py-2 rounded-full transition-all duration-200 ${
                isRegister
                  ? "bg-white text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-0">
              {/* Email */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="name@example.com"
                        className="rounded-[12px] border-border bg-white h-9 px-4 text-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Password */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center justify-between mb-1">
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-sm font-medium text-foreground"
                        >
                          Password
                        </FieldLabel>
                      </div>
                      <Input
                        id={field.name}
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        className="rounded-[12px] border-border bg-white h-9 px-4 text-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>

            {/* Submit Button */}
            <Button
              form="login-form"
              type="submit"
              className="w-full mt-8 h-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
