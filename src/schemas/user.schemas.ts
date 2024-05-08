import { z } from "zod";

export const userSignSchema = z.object({
  username: z.string().min(1, "Usuário deve ser informado"),
  password: z.string().min(1, "Senha deve ser informada"),
});
