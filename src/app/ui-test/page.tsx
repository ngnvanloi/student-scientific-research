import { auth, signIn } from "@/auth";
import { signOut } from "next-auth/react";

export default async function SignIn() {
  const session = await auth();

  return session?.user ? (
    <div>
      <p>Welcome: {session?.user.name}</p>
      <button className="border p-3">Signout</button>
    </div>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className="border p-3">
        Signin with Google
      </button>
    </form>
  );
}
