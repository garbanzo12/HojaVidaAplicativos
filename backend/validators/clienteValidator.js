import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre del aplicativo es obligatorio.",
      invalid_type_error: "El nombre debe ser texto.",
    })
    .min(1, "El nombre no puede estar vacío."),

  pais: z
    .string({
      required_error: "El pais es obligatorio.",
    }),
    

  estado: z.enum(["HABILITADO", "DESHABILITADO"]).default("HABILITADO"),
});
