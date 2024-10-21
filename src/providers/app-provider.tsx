import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "./react-query-provider";
import SessionGuard from "./session-guard";
import { auth } from "@/auth";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <SessionProvider refetchInterval={5 * 60}>
        <SessionGuard>{children}</SessionGuard>
      </SessionProvider>
    </ReactQueryProvider>
  );
};
