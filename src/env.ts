import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.url(),
    FRONTENDURL: z.url(),
    JWT_ACCESS_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.url(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTENDURL: process.env.FRONTENDURL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});
