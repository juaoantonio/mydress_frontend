import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z
        .string({
            message: "Nome deve ser preenchido",
        })
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .trim(),

    cpf: z.string().trim().length(11, "CPF deve ter 11 caracteres").nullable(),

    rg: z.string().trim().length(7, "RG deve ter 7 caracteres").nullable(),

    address: z.string().trim().nullable(),

    phone: z
        .string()
        .trim()
        .length(11, "Telefone deve ter 11 caracteres")
        .nullable(),

    email: z
        .string()
        .email({
            message: "Email inválido",
        })
        .nullable(),

    notes: z.string().optional(),
});

export const updateCustomerSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .trim()
        .optional(),

    cpf: z.string().trim().length(11, "CPF deve ter 11 caracteres").nullable(),

    rg: z.string().trim().length(7, "RG deve ter 7 caracteres").nullable(),

    address: z.string().trim().nullable(),

    phone: z
        .string()
        .trim()
        .length(11, "Telefone deve ter 11 caracteres")
        .nullable(),

    email: z
        .string()
        .email({
            message: "Email inválido",
        })
        .nullable(),

    notes: z.string().optional(),
});
