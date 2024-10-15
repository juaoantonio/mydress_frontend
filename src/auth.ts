import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateUser } from "@/services/auth/auth.service";
import { userSignSchema } from "@/schemas/user.schemas";
import { ZodError } from "zod";
import { UserSignInOutputDTO } from "@/types/user.types";
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
    sub: string;
    username: number;
    iat: number;
    exp: number;
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

                    const { username, password } =
                        await userSignSchema.parseAsync({
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
            const decodedAccessToken = jwtDecode(
                token.user.accessToken,
            ) as CommonToken;
            if (Date.now() >= decodedAccessToken.exp * 1000) {
                await signOut({
                    redirect: true,
                    redirectTo: "/login",
                });
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                session.user = token.user as any;
            }

            return session;
        },
    },
});
