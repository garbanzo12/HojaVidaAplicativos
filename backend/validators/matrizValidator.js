import { z } from "zod";

// 🧩 Esquema de validación para la matriz de escalamiento
export const matrizSchema = z.object({
  proveedor: z
    .string({
      required_error: "El nombre del proveedor es obligatorio.",
      invalid_type_error: "El proveedor debe ser texto.",
    })
    .min(1, "El proveedor no puede estar vacío."),

  codigo_servicio: z
    .string({
      required_error: "El código de servicio es obligatorio.",
      invalid_type_error: "El código de servicio debe ser texto.",
    })
    .min(1, "El código de servicio no puede estar vacío."),

  n_telefono_proveedor: z
    .string({
      required_error: "El teléfono del proveedor es obligatorio.",
      invalid_type_error: "El teléfono debe ser texto o número en formato string.",
    })
    .regex(/^[0-9+\-()\s]{7,20}$/, "Debe ser un número de teléfono válido."),

  n_telefono_asesor: z
    .string({
      required_error: "El teléfono del asesor es obligatorio.",
      invalid_type_error: "El teléfono debe ser texto o número en formato string.",
    })
    .regex(/^[0-9+\-()\s]{7,20}$/, "Debe ser un número de teléfono válido."),

  campanaId: z.preprocess(
    (val) => (val ? Number(val) : null),
    z
      .number({
        required_error: "El ID de la campaña es obligatorio.",
        invalid_type_error: "El ID de la campaña debe ser numérico.",
      })
      .int()
      .positive()
  ),

  estado: z
    .enum(["HABILITADO", "DESHABILITADO"], {
      required_error: "El estado es obligatorio.",
      invalid_type_error: "El estado debe ser HABILITADO o DESHABILITADO.",
    })
    .default("HABILITADO"),
});
