import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserTokens } from "@/services/auth.service";
import { UserSignInOutputDTO } from "@/types/user";
import { userSignSchema } from "@/schemas/user.schemas";
import { ZodError } from "zod";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSignInOutputDTO & DefaultSession["user"];
  }

  interface User extends UserSignInOutputDTO {}
}

// @ts-ignore
// @ts-ignore
export const { handlers, signOut, signIn, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      // @ts-ignore
      authorize: async (credentials) => {
        try {
          let user = null;

          const { username, password } =
            await userSignSchema.parseAsync(credentials);

          user = await getUserTokens({
            username,
            password,
          });

          if (!user) {
            throw new Error("Usuário não encontrado.");
          }

          return user;
        } catch (e) {
          if (e instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
});
