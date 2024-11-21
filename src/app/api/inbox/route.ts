import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

// Gmail API Scopes
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

// OAuth2 Configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL + "/api/auth/google/callback"
);

// Step 1: Generate Auth URL
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Redirect to Google OAuth consent screen
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    res.redirect(authUrl);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
