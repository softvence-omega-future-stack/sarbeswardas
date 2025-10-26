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
  meta: any | null; // can be refined if needed
  data: UserProfile;
}
