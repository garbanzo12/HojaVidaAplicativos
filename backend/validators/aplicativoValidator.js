import { z } from "zod";
import pkg from "@prisma/client";
const { TipoRed } = pkg;

export const aplicativoSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre del aplicativo es obligatorio.",
      invalid_type_error: "El nombre debe ser texto.",
    })
    .min(1, "El nombre no puede estar vacío."),

  direccion_ip: z
    .string({
      required_error: "La dirección IP es obligatoria.",
    })
    .regex(
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
      "Debe ser una dirección IP válida."
    ),

   puerto: z.preprocess((val) => Number(val), z.number().int().positive()),

  url: z
    .string({
      required_error: "La URL es obligatoria.",
    })
    .url("Debe ser una URL válida."),

  tipo_aplicativo: z
    .string(TipoRed, {
      required_error: "El tipo de aplicativo es obligatorio.",
      invalid_type_error: "El tipo de aplicativo debe ser Internet, Abai o Proveedor.",
    })
    .refine(
      (val) => ["internet", "abai", "proveedor"].includes(val),
      "El tipo de aplicativo debe ser Internet, Abai o Proveedor."
    ),
  tipo_red: z
    .string({
      required_error: "El escalamiento es obligatorio.",
    })
    .min(1, "El escalamiento no puede estar vacío."),
    
  escalamiento: z
    .string({
      required_error: "El escalamiento es obligatorio.",
    })
    .min(1, "El escalamiento no puede estar vacío."),

  campanaId: z
    .number({
      required_error: "El ID de la campaña es obligatorio.",
      invalid_type_error: "El ID de la campaña debe ser numérico.",
    }),

  estado: z.enum(["HABILITADO", "DESHABILITADO"]).default("HABILITADO"),
});
