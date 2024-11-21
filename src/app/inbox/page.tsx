"use client";
import { useState, useEffect } from "react";

export default function Inbox() {
  const [emails, setEmails] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth-check");
      setIsAuthenticated(res.ok);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function fetchEmails() {
      try {
        // Gọi API từ server
        const res = await fetch("/api/inbox", { method: "GET" });
        if (!res.ok) {
          throw new Error("Failed to fetch emails");
        }
        const data = await res.json();
        setEmails(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Your Inbox</h1>
      {!isAuthenticated ? (
        <div>
          <p>You need to log in with Google to see your inbox.</p>
          <a href="/api/auth/google">
            <button>Log in with Google</button>
          </a>
        </div>
      ) : (
        <div>
          <h1>Your Inbox</h1>
          {emails.length === 0 ? (
            <p>No unread emails found.</p>
          ) : (
            <ul>
              {emails.map((email, index) => (
                <li key={index}>Email ID: {email.id}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
