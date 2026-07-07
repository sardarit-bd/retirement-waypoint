import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const authBaseURL = process.env.NEXT_PUBLIC_AUTH_URL;

export const authClient = createAuthClient({
  ...(authBaseURL ? { baseURL: authBaseURL } : {}),
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
