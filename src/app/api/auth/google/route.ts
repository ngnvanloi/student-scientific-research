import { google } from "googleapis";
import { NextResponse } from "next/server";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    try {
      // Đổi mã xác thực lấy access token
      const { tokens } = await oAuth2Client.getToken(code);

      if (!tokens.access_token) {
        return NextResponse.json(
          { message: "Access token is missing" },
          { status: 400 }
        );
      }

      // Lưu access token vào cookie
      const res = NextResponse.redirect("/inbox");
      res.cookies.set("google_access_token", tokens.access_token, {
        httpOnly: true,
        // secure: process.env.NEXT_PUBL  IC_ENV === "developer", // Đảm bảo "production" trong môi trường live
        path: "/",
      });

      return res;
    } catch (error: any) {
      return NextResponse.json(
        { message: "Failed to get token", error: error.message },
        { status: 500 }
      );
    }
  }

  // Nếu không có code, chuyển hướng người dùng tới trang xác thực của Google
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
  });

  return NextResponse.redirect(authUrl);
}
