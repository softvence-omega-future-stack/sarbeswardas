import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

// Type for API response that may contain a message
interface ApiResponseMessage {
  message?: string;
}

// Typed baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sarbeswardas-backend.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth?: { token?: string } })?.auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// Fully typed wrapper for toast notifications
const baseQueryWithToast = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);

  // Determine HTTP method
  const method =
    typeof args === "object" && "method" in args
      ? args.method?.toUpperCase()
      : "GET";

  if (
    result.data &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(method ?? "")
  ) {
    const message = (result.data as ApiResponseMessage)?.message;
    if (message) toast.success(message);
  }

  if (
    result.error &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(method ?? "")
  ) {
    const errorData = result.error as FetchBaseQueryError & {
      data?: ApiResponseMessage;
    };
    const message = errorData.data?.message || "Something went wrong!";
    toast.error(message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToast,
  endpoints: () => ({}),
  tagTypes: ["Profile"],
});
