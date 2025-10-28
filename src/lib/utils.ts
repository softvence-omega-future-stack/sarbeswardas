import { removeToken } from "@/store/api/AuthState";
import { AdapterResponse } from "@/store/api/types/profile";
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

export function formatAIResponse(text: string): string {
  if (!text) return "";

  return (
    text
      // Remove Markdown headings (###, ##, #)
      .replace(/^#{1,6}\s*/gm, "")
      // Remove horizontal rules (---)
      .replace(/^-{3,}\s*$/gm, "")
      // Remove bold/italic markers **bold**, *italic*, __bold__, _italic_
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      // Remove backticks for inline code
      .replace(/`([^`]+)`/g, "$1")
      // Remove list markers (-, *, +, 1. etc.)
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      // Normalize multiple newlines
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      // Trim spaces at the start/end of each line
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      // Collapse multiple spaces
      .replace(/\s{2,}/g, " ")
      // Final trim
      .trim()
  );
}

export const getAdapterResponse = (
  allResponses: AdapterResponse[],
  adapter: string
) => {
  const response = allResponses.find((resp) => resp.adapter === adapter);
  return response?.text || "";
};
