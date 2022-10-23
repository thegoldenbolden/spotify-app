import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      followers?: number;
      access: string;
    } & User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user: User;
  }
}
