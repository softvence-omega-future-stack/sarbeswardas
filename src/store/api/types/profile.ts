// Type for the user object
export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
  isVerified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Type for the API response
export interface GetProfileResponse {
  success: boolean;
  message: string;
  meta: null;
  data: UserProfile;
}

//  for text
export interface AiResponse {
  data: SessionData;
}

//  for image
export interface ImageApiResponse {
  success: boolean;
  data: {
    sessionId: string;
    prompt: string;
    imageUrl: string;
    adapter: string;
  };
}

export interface SessionData {
  sessionId: string;
  sequenceNumber: number;
  prompt: string;
  response: ResponseData;
}

export interface ResponseData {
  selected: SelectedResponse;
  allResponses: AdapterResponse[];
}

export interface SelectedResponse {
  adapter: string;
  text: string;
}

export interface AdapterResponse {
  adapter: "openai" | "gemini" | "claude" | "perplexity";
  text: string;
}
