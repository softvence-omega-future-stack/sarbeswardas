export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  meta: null;
  data: {
    accessToken: string;
  };
}

export interface SignUp {
  fullName: string;
  email: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  otp: string;
  newPassword: string;
}
