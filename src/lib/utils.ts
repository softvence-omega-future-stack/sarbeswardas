import { removeToken } from "@/store/api/AuthState";
import { AppDispatch } from "@/store/store";
import { clsx, type ClassValue } from "clsx";
import { Router } from "next/router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logout = (dispatch: AppDispatch, router: Router) => {
  dispatch(removeToken());
  router.push("/login");
};
