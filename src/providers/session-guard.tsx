"use client";
import { setAuthToken } from "@/web-configs/community-api";
// import { setEcomApiToken } from "@/web-configs/ecommerce-api";
// import { setAuthToken } from "@/web-configs/social-api";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, type ReactNode } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (!session) return;
  //   if (session.user?.accessToken) {
  //     console.log("Access toke has changed!");
  //     setAuthToken(session.user?.accessToken);
  //   }
  // }, [session]);

  if (status === "loading") return null;

  return <Fragment>{children}</Fragment>;
}
