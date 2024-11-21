import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookies = req.headers.get("cookie") || "";
  const token = cookies
    .split(";")
    .find((c) => c.trim().startsWith("google_access_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
