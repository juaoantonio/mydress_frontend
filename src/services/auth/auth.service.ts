import { UserSignInInputDTO, UserSignInOutputDTO } from "@/types/user";
import { User } from "next-auth";

export async function getUserTokens(
  credentials: UserSignInInputDTO,
): Promise<User | null> {
  const getTokensUrl = `mydress.joaobarbosa.dev.br/api/v1/token/`;

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
