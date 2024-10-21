// Mở rộng module "next-auth"
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    userId?: numer | null;
    accountId?: number;
    name?: string | null;
    roleName?: string | null;
    numberPhone?: string | null;
    facultyId?: number | null;
    facultyName?: string | null;
    internalCode?: string | null | number;
    email?: string | null;

    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null | string;
  }

  interface Session {
    user?: {
      userId?: numer | null;
      accountId?: number;
      name?: string | null;
      roleName?: string | null;
      numberPhone?: string | null;
      facultyId?: number | null;
      facultyName?: string | null;
      internalCode?: string | null | number;
      email?: string | null;

      accessToken?: string | null;
      refreshToken?: string | null;
      expiresAt?: number | null | string;
    } & DefaultSession["user"];
  }
}
