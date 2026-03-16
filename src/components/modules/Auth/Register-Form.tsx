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
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export function RegisterForm() {
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
      } catch {
        toast.error("Something went wrong! Try again.", { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-0">
              {/* Full Name */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="John Doe"
                        className="rounded-[6px] border-border bg-white h-9 px-4 text-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

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
                        className="rounded-[6px] border-border bg-white h-9 px-4 text-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Address */}
              <form.Field name="address">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Address
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="e.g. House:23,  Road:23, Jamaica, USA"
                        className="rounded-[6px] border-border bg-white h-9 px-4 text-sm"
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
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        className="rounded-[6px] border-border bg-white h-9 px-4 text-sm"
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
              form="register-form"
              type="submit"
              className="w-full mt-8 h-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
