import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const createProductSchema = z.object({
    image: z
        .any()
        .refine((file) => !!file, `A imagem deve ser preenchida.`)
        .refine((file) => {
            return file?.size <= MAX_FILE_SIZE;
        }, `A imagem deve ter no máximo 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
            `A imagem deve ser do tipo ${ACCEPTED_IMAGE_TYPES.join(", ")}.`,
        ),

    color: z.string().min(1, {
        message: "A cor deve ser preenchida",
    }),

    model: z.string().min(1, {
        message: "O modelo deve ser preenchido",
    }),

    rentPrice: z
        .union([
            z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
            z.number(),
        ])
        .pipe(z.coerce.number().min(0.0001).max(999999999)),
});

export const createDressSchema = createProductSchema.extend({
    fabric: z.string().min(1, {
        message: "O tipo de tecido deve ser preenchido",
    }),
});

export const createPurseSchema = createProductSchema.extend({});
