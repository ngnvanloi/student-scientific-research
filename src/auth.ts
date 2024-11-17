import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import {
  login,
  LoginParams,
  useLoginMutation,
} from "./hooks-query/queries/use-login-mutation";
import { setAuthToken } from "./web-configs/community-api";
import { getProfile } from "./hooks-query/queries/use-get-user-profile";
// import { User } from "lucide-react";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // trustHost: true,
  // debug: true,
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/login",
  // },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const params: LoginParams = {
          email: credentials.email as string,
          password: credentials.password as string,
        };

        const res = await login(params);
        console.log("Checking res: ", res);

        if (!res.data.tokenResponse?.refreshToken) {
          return null;
        }

        // Đặt access token sau khi đăng nhập thành công
        setAuthToken(res.data.tokenResponse?.refreshToken);

        let user_profile = null;
        if (res.data.tokenResponse.account.roleName !== "superadmin") {
          // Chỉ lấy user profile nếu role không phải là super-admin
          try {
            user_profile = await getProfile();
            console.log("User profile: ", user_profile.data);
          } catch (error) {
            console.error("Error fetching user profile: ", error);
            // Nếu gặp lỗi khác ngoài lỗi không có thông tin cá nhân, throw error để xử lý
            throw new Error("Failed to fetch user profile.");
          }
        }

        // Xác định thông tin user để trả về tùy thuộc vào vai trò
        const user: User = {
          userId: user_profile?.data?.id || null,
          accountId: res.data.tokenResponse.account.id,
          name: user_profile?.data?.name || "Quản trị viên",
          roleName: res.data.tokenResponse.account.roleName,
          numberPhone: user_profile?.data?.numberPhone || "",
          facultyId: user_profile?.data?.facultyId || null,
          facultyName: user_profile?.data?.facultyName || null,
          internalCode: user_profile?.data?.internalCode || "",
          email: credentials.email as string,
          accessToken: res.data.tokenResponse.accessToken,
          refreshToken: res.data.tokenResponse.refreshToken,
          expiresAt: res.data.tokenResponse.expires,
        };

        console.log("check user", user);
        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      },
    }),
    Google,
  ],

  callbacks: {
    signIn({ account, user, credentials, profile }) {
      // console.log(
      //   "signIn: " +
      //     JSON.stringify([account, user, credentials, profile], null, 2)
      // );
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      // console.log("authorized: " + JSON.stringify(auth, null, 2));
      // const isLoggedIn = !!auth?.user;

      // const profile = nextUrl.pathname.startsWith("/profile");
      // if (profile) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/dashboard", nextUrl));
      // }
      return true;
    },
    async jwt({ token, user, account }) {
      // Đây là nơi bạn cần gán các giá trị trả về từ authorize()
      // (như user, accessToken, refreshToken, v.v.) vào token
      if (user) {
        token.userId = user.userId;
        token.accountId = user.accountId;
        token.name = user.name;
        token.roleName = user.roleName;
        token.numberPhone = user.numberPhone;
        token.facultyId = user.facultyId;
        token.facultyName = user.facultyName;
        token.internalCode = user.internalCode;
        token.email = user.email;

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
      }

      return token;
    },

    async session({ session, token }) {
      // lưu ý: session không được tạo ra từ kết quả trả về của hàm authorized() mà phải thông qua token
      // session callback: Trong callback này, bạn sẽ cần lấy các giá trị từ token và
      // gán vào session trước khi nó được trả về phía client.
      session.user.userId = token.userId;
      session.user.accountId = token.accountId as number;
      session.user.name = token.name as string;
      session.user.roleName = token.roleName as string;
      session.user.numberPhone = token.numberPhone as string;
      session.user.facultyId = token.facultyId as number;
      session.user.facultyName = token.facultyName as string;
      session.user.internalCode = token.internalCode as number | string;
      session.user.email = token.email as string;

      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.expiresAt = token.expiresAt as string | number;

      return session;
    },
  },
});

// NOTE:
// Cơ chế hoạt động
// 1. authorize() thực hiện xác thực người dùng, trả về thông tin người dùng tạm thời.
// 2. jwt() lưu trữ thông tin người dùng vào token JWT.
// 3. session() trích xuất thông tin từ JWT và gán vào session để sử dụng trên client-side.
