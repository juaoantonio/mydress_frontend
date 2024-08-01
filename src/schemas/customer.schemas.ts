import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z
        .string({
            message: "Nome deve ser preenchido",
        })
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .trim(),
    cpf: z
        .string({
            message: "CPF deve ser preenchido",
        })
        .trim()
        .length(11, "CPF deve ter 11 caracteres"),
    rg: z
        .string({
            message: "RG deve ser preenchido",
        })
        .trim()
        .length(7, "RG deve ter 7 caracteres"),
    address: z
        .string({
            message: "Endereço deve ser preenchido",
        })
        .trim(),
    phone: z
        .string({
            message: "Telefone para contato deve ser preenchido",
        })
        .trim()
        .length(11, "Telefone deve ter 11 caracteres"),
    email: z
        .string({
            message: "Email deve ser preenchido",
        })
        .email({
            message: "Email inválido",
        }),
    notes: z.string().optional(),
});
