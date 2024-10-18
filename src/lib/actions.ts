"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// ...

export async function authenticate(formData: {
  email: string;
  password: string;
}) {
  try {
    // Call your server-side logic to handle the login request
    const res = await signIn("credentials", formData);
    console.log("==== checking res: ", res);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
