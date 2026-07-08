import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
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
