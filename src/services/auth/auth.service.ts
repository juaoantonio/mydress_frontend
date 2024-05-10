import { UserSignInInputDTO, UserSignInOutputDTO } from "@/types/user";
import { User } from "next-auth";
import { env } from "@/env";

export async function authenticateUser(
  credentials: UserSignInInputDTO,
): Promise<User | null> {
  try {
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

    throw new Error("Server Error: Failed to get user");
  } catch (e) {
    console.error(e);
    return null;
  }
}
