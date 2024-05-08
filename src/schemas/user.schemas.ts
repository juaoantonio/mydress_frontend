import { z } from "zod";

export const userSignSchema = z.object({
  username: z.string({ required_error: "Usuário deve ser informado" }),
  password: z.string({ required_error: "Senha deve ser informada" }),
});
