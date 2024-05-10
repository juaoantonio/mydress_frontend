import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserTokens } from "@/services/auth/auth.service";
import { UserSignInOutputDTO } from "@/types/user";
import { userSignSchema } from "@/schemas/user.schemas";
import { ZodError } from "zod";
import log from "logging-service";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSignInOutputDTO & DefaultSession["user"];
  }

  interface User extends UserSignInOutputDTO {}
}

export const { handlers, signOut, signIn, auth } = NextAuth({
  logger: {
    error(code, ...message) {
      log.error(code, message);
    },
    warn(code, ...message) {
      log.warn(code, message);
    },
    debug(code, ...message) {
      log.debug(code, message);
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        username: {},
        password: {},
      },

      // @ts-ignore
      authorize: async (credentials) => {
        try {
          let user = null;

          const { username, password } = await userSignSchema.parseAsync({
            username: credentials.username,
            password: credentials.password,
          });

          user = await getUserTokens({
            username,
            password,
          });

          if (!user) {
            throw new CredentialsSignin("Usuário não encontrado.");
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
