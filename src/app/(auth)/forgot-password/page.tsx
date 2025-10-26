"use client";

import AuthRedirect from "@/components/AuthRedirect";
import CommonButton from "@/components/common/button/CommonButton";
import ButtonWithLoading from "@/components/common/custom/ButtonWithLoading";
import CommonHeader from "@/components/common/header/CommonHeader";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("selectedEmail");
    if (storedEmail) {
      setValue("email", storedEmail);
    }
  }, [setValue]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      localStorage.setItem("selectedEmail", data.email);
      await forgotPassword(data);
      reset();
    } catch (err) {
      const error = err as FetchBaseQueryError | { data?: { message: string } };
      console.log(error);
    }
  };

  const inputClass = {
    input:
      "w-full px-4 py-3 text-sm leading-[22px] rounded-lg  border border-[#DFE3E8] dark:border-[#212B36] bg-[#F4F6F8] dark:bg-[#161C24] text-[#919EAB] dark:text-[#637381]  cursor-pointer transition outline-none",
    label:
      "text-sm leading-[22px] text-[#212B36] dark:text-[#DFE3E8] mb-1 block",
    error: "text-red-500 text-xs mt-1",
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-[#0B0D12] rounded-2xl shadow-2xl w-[360px] p-6 sm:p-8 relative">
        <div className="text-center mb-6">
          <CommonHeader size="xl" className="!text-center">
            Forgot Password
          </CommonHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className={inputClass.label}>Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email")}
              className={inputClass.input}
            />
            {errors.email && (
              <p className={inputClass.error}>{errors.email.message}</p>
            )}
          </div>

          <CommonButton
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full "
          >
            {isLoading ? <ButtonWithLoading title="Sending..." /> : "Send OTP"}
          </CommonButton>
        </form>

        <div className="text-center mt-5 space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:underline font-medium cursor-pointer"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-green-600 hover:underline font-medium cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <AuthRedirect>
      <ForgotPasswordPage />
    </AuthRedirect>
  );
}
