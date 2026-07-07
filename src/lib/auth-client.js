import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  plugins: [adminClient()],
  fetchOptions: {
    credentials: "include",
  },
});

// Export everything from authClient
export const {
  signUp,
  signIn,
  signOut,
  useSession,
  useListSessions,
  useRevokeSession,
  getSession,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
} = authClient;