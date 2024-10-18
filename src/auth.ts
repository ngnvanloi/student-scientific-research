import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // trustHost: true,
  // debug: true,
  // session: {
  //   strategy: "jwt",
  // },
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
        console.log(
          `=====> check your credentials: ${credentials.email}, ${credentials.password}
          `
        );
        // type User là mặc định của AuthJS
        let user: User = {
          id: "1",
          name: "Nguyen Van Loi",
          email: "mark@gmail.com",
          image: "",
        };

        // logic to salt and hash password
        // kiểm tra login, nếu đúng thì lưu access token ...
        // dùng hàm setAuthToken()

        // logic to verify if the user exists
        // lấy thông tin user ...

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        // return để lưu vào session
        return user;
      },
    }),
  ],
});
