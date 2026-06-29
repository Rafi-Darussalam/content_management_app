import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { resend } from "./resend";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }, request) => {
      void resend.emails.send({
        from: "onboarding@resend.dev",
        to: "rafidarussalam80@gmail.com",
        subject: "Sign-up attempt with your email",
        html: `<h1>Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.</h1>`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "onboarding@resend.dev",
        to: "rafidarussalam80@gmail.com",
        subject: "Verify email",
        html: `<a href="${url}">Verify</a>`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
    organization(),
    nextCookies(),
  ],
});
