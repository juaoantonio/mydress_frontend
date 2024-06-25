import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateUser } from "@/services/auth/auth.service";
import { userSignSchema } from "@/schemas/user.schemas";
import { ZodError } from "zod";
import { UserSignInOutputDTO } from "@/types/user";
import { jwtDecode } from "jwt-decode";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSignInOutputDTO & DefaultSession["user"];
  }

  interface JWT {
    user: UserSignInOutputDTO;
  }

  interface User extends UserSignInOutputDTO {
    error?: string;
  }
}

type CommonToken = {
  token_type: string;
  iat: number;
  exp: number;
  jti: string;
  user_id: number;
};

export const { handlers, signOut, signIn, auth } = NextAuth({
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

          user = await authenticateUser({
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
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user;
        return token;
      }
      const decodedRefreshToken = jwtDecode(token.user.refresh) as CommonToken;

      if (Date.now() >= decodedRefreshToken.exp * 1000) {
        await signOut({
          redirect: true,
          redirectTo: "/login",
        });
      }

      const decodedAccessToken = jwtDecode(token.user.access) as CommonToken;

      if (Date.now() < decodedAccessToken.exp * 1000) {
        return token;
      }

      const newAccessToken = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`,
        {
          method: "POST",
          body: JSON.stringify(token.user.refresh),
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json());

      return {
        ...token,
        user: {
          ...token.user,
          access: newAccessToken.access,
        },
      };
    },
    async session({ session, token, user }) {
      if (token) {
        session.user = token.user as any;
      }

      return session;
    },
  },
});
