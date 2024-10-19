import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login, LoginParams } from "./hooks-query/queries/use-login-mutation";
import { setAuthToken } from "./web-configs/community-api";
import { getProfile } from "./hooks-query/queries/use-get-user-profile";

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
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const params: LoginParams = {
          email: credentials.email as string,
          password: credentials.password as string,
        };

        // logic login
        const res = await login(params);
        console.log("Checking res: ", res);

        if (!res.data.tokenResponse?.accessToken) {
          return null;
        }

        // login success => set access token
        setAuthToken(res.data.tokenResponse?.accessToken);

        // get user profile if the user exists
        const user_profile = await getProfile();
        console.log("User profile: ", user_profile.data);

        // Kiểm tra chắc chắn dữ liệu hợp lệ
        if (!user_profile?.data || !res.data?.tokenResponse?.account) {
          return null;
        }

        // Sau khi lấy user_profile
        const user: User = {
          userId: user_profile.data.id,
          accountId: res.data.tokenResponse.account.id,
          name: user_profile.data.name,
          roleName: res.data.tokenResponse.account.roleName,
          numberPhone: user_profile.data.numberPhone,
          facultyId: user_profile.data.facultyId,
          facultyName: user_profile.data.facultyName,
          internalCode: user_profile.data.internalCode,
          email: credentials.email as string,
        };

        console.log("check user", user);
        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      },
    }),
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
    async session({ session, token, user }) {
      console.log(
        "authConfig session: " + JSON.stringify([session, token, user], null, 2)
      );
      return {
        ...session,
        user: {
          ...session.user,
          userId: user?.userId, // Sử dụng dấu ? để tránh lỗi khi user undefined
          accountId: user?.accountId,
          roleName: user?.roleName,
          numberPhone: user?.numberPhone,
          falcutyId: user?.facultyId,
          facultyName: user?.facultyName,
          internalCode: user?.internalCode,
          user: {
            ...session.user,
            userId: user?.userId || token.id, // Nếu user undefined, dùng token.id
            accountId: user?.accountId,
            roleName: user?.roleName,
            numberPhone: user?.numberPhone,
            falcutyId: user?.facultyId,
            facultyName: user?.facultyName,
            internalCode: user?.internalCode,
            email: user?.email, // Thêm email vào session.user
          },
        },
      };
    },
    jwt({ token, user, account, session, profile, trigger }) {
      // console.log(
      //   "authConfig jwt: " +
      //     JSON.stringify(
      //       [token, user, account, session, profile, trigger],
      //       null,
      //       2
      //     )
      // );
      if (user) {
        token.id = user.userId; // Sử dụng userId thay vì id
        //@ts-expect-error
        token.access_token = user.access_token;
        //@ts-expect-error
        token.branch_token = user.branch_token;
      }
      return token;
    },
  },
});
