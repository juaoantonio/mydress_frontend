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
  img: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `A imagem deve ter no máximo 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      `A imagem deve ser do tipo ${ACCEPTED_IMAGE_TYPES.join(", ")}.`,
    ),

  price: z.number().positive({
    message: "O preço deve ser um valor positivo",
  }),

  description: z.string().optional(),

  purchesable: z.boolean().default(false),

  rentable: z.boolean().default(true),
});

const createDressForm = createProductSchema.extend({
  fabric: z.string({
    message: "O tipo de tecido deve ser preenchido",
  }),

  color: z.string({
    message: "A cor deve ser preenchida",
  }),

  availableForAdjustment: z.boolean().default(false),

  status: z.enum(["new", "used"], {
    message: "O status deve ser preenchido",
  }),
});

export const createPurseSchema = createProductSchema.extend({
  material: z.string({
    message: "O material deve ser preenchido",
  }),

  color: z.string({
    message: "A cor deve ser preenchida",
  }),
});
