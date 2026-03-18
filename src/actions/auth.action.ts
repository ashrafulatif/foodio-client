"use server";
import { deleteCookie, getCookie } from "@/lib/cookieUtils";
import { jwtUtils } from "@/lib/jwtUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { AuthServices } from "@/services/auth.services";
import { ILoginData, IRegisterData } from "@/types";

export const registerUserAction = async (registerData: IRegisterData) => {
  const result = await AuthServices.registerUser(registerData);
  return result;
};

export const loginUserAction = async (loginData: ILoginData) => {
  const result = await AuthServices.loginUser(loginData);

  const { accessToken } = result.data;
  //set token in cookie
  if (accessToken) {
    await setTokenInCookies("accessToken", accessToken);
  }

  return result;
};

export const logoutAction = async () => {
  await deleteCookie("accessToken");
};

export const getAuthStateAction = async () => {
  const token = await getCookie("accessToken");
  if (!token) return { isLoggedIn: false, role: null };

  const decoded = jwtUtils.decodedToken(token);
  return {
    isLoggedIn: true,
    role: (decoded?.role as "CUSTOMER" | "ADMIN") ?? null,
  };
};
