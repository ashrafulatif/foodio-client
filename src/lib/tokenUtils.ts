"use server";

import { setCookie } from "./cookieUtils";

export const setTokenInCookies = async (
  name: string,
  token: string,
  fallbackMaxAgeInSeconds = 60 * 60 * 24,
) => {
  let maxAgeInSeconds;

  await setCookie(name, token, maxAgeInSeconds || fallbackMaxAgeInSeconds);
};
