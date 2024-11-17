"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SignUpImageSidebar } from "./SignUpImageSidebar";
import SignUpProcessing from "./SignUpProcessing";
import { GoogleSVG } from "@/assets/svg/google.icon";

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
  }

  // RENDER UI
  return (
    <main className="w-full flex">
      <SignUpImageSidebar />
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          {/* FORM SIGN UP PROCESSING */}
          <SignUpProcessing />
        </div>
      </div>
    </main>
  );
};
export { SignUpForm };
