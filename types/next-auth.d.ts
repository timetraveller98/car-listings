import NextAuth from "next-auth";
declare module "next-auth" {
  interface User {
    name: string;
    role: string;
  }
  interface Session {
    user: User & {
      name: string;
      role: string;
    };
    token: {
      name: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null;
    role?: string;
  }
}
