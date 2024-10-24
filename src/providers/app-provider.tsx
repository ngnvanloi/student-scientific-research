"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactQueryProvider } from "./react-query-provider";
import SessionGuard from "./session-guard";
import { auth } from "@/auth";
// import ApplicationGlobalContext from "./app-global-context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const { data: session, status } = useSession();

  return (
    // <ApplicationGlobalContext.Provider value={{ session }}>
    <ReactQueryProvider>
      <SessionProvider refetchInterval={5 * 60}>
        <SessionGuard>{children}</SessionGuard>
      </SessionProvider>
    </ReactQueryProvider>
    // </ApplicationGlobalContext.Provider>
  );
};
