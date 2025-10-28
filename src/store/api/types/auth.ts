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
//google login
export interface GoogleLogin {
  email: string;
  provider: string;
  fullName: string;
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

export interface AiSendPrompt {
  session_id: string;
  prompt: string;
  contentType: "text" | "image";
}

// all session
export interface Session {
  sessionId: string;
  title: string;
  messageCount: number;
  lastMessageAt: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface SessionsData {
  sessions: Session[];
  total: number;
  limit: number;
  skip: number;
}

export interface AllSessionResponse {
  data: SessionsData;
}

// single ai session

export interface SessionHistoryResponse {
  success: boolean;
  message: string;
  meta: null;
  data: SessionData;
}

export interface SessionData {
  sessionId: string;
  userId: string;
  messages: SessionMessage[];
  totalMessages: number;
  createdAt: string;
  updatedAt: string;
}

export interface SessionMessage {
  sequenceNumber: number;
  prompt: string;
  response: SessionResponse;
  timestamp: string;
}

export interface SessionResponse {
  selected: ResponseAdapter;
  allResponses: ResponseAdapter[];
}

export interface ResponseAdapter {
  adapter: "openai" | "gemini" | "claude" | "perplexity" | string;
  text: string;
}

export interface Plan {
  _id: string;
  name: string;
  priceId: string;
  price: number;
  currency: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PlanResponse {
  data: Plan[];
}

export interface SubscribePlanPayload {
  subscribedPlanId: string;
}

export interface SubscribePlanResponse {
  success: boolean;
  message: string;
  meta: null;
  data: {
    url: string;
  };
}

// session update
export interface UpdateSessionPayload {
  sessionId: string;
  newTitle: string;
}
