import * as z from "zod";

export const RegistrationformSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const LoginformSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});
