import { UserSignInInputDTO, UserSignInOutputDTO } from "@/types/user";
import { env } from "@/env";
import { User } from "next-auth";

export async function getUserTokens(
  credentials: UserSignInInputDTO,
): Promise<User | null> {
  const getTokensUrl = `${env.API_BASE_URL}/token/`;

  const response = await fetch(getTokensUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.status === 200)
    return (await response.json()) as UserSignInOutputDTO;
  if (response.status === 401) return null; // 401 - Unauthorized

  throw new Error("Algo deu errado! Contate o suporte.");
}
