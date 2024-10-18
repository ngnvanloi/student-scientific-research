"use client";
// import { setEcomApiToken } from "@/web-configs/ecommerce-api";
// import { setAuthToken } from "@/web-configs/social-api";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, type ReactNode } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (!data) return;
  //   if (data.user?.access_token) {
  //     setAuthToken(data.user?.access_token);
  //   }
  //   if (data.user?.branch_token) {
  //     setEcomApiToken(data.user?.branch_token);
  //   }
  // }, [data]);

  if (status === "loading") return null;

  return <Fragment>{children}</Fragment>;
}
