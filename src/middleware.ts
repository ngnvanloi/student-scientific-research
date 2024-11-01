import { NextResponse, NextRequest } from "next/server";
import { auth } from "./auth";

const roleRoutes = {
  author: "/author",
  reviewer: "/reviewer",
  superadmin: "/super-admin",
  organizer: "/admin",
};

// apply to all routes except api, _next/static, _next/image, favicon.ico
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const requestHeaders = new Headers(req.headers);

  // Lấy thông tin session qua auth()
  const session = await auth();

  if (session) {
    // Set token vào headers nếu session tồn tại
    requestHeaders.set(
      "set-cookie",
      `Authentication=Bearer ${
        session.user?.accessToken
      }; path=/; samesite=lax; httponly; expires=${new Date(
        Number(session.expires) * 1000
      ).toUTCString()}`
    );
  }

  // Kiểm tra roleName từ session và bảo vệ các route
  const userRole = session?.user?.roleName;
  const allowedRoute = roleRoutes[userRole as keyof typeof roleRoutes];

  // Nếu là trang cần quyền truy cập, kiểm tra role của user
  const isRoleRoute = Object.values(roleRoutes).some((route) =>
    path.startsWith(route)
  );

  if (isRoleRoute && (!session || path !== allowedRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
