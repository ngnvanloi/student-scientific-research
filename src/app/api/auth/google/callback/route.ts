import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

// OAuth2 Configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Step 2: Handle Google OAuth callback
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: "Authorization code missing" });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Step 3: Fetch emails using Gmail API
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      q: "is:unread",
    });

    res.status(200).json(response.data.messages || []);
  } catch (error: any) {
    console.error("Error fetching emails:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch emails", error: error.message });
  }
}
