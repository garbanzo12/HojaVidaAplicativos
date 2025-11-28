import { z } from "zod";

// 📌 Tipos permitidos
const tiposDocumento = ["CC", "PEP", "DIE"];
const sedes = ["pereira", "bogota", "manizales"];
const roles = ["administrador", "proveedor"];

// 📌 Reglas comunes de usuario
const baseUsuarioSchema = {
  nombre_completo: z
    .string({
      required_error: "El nombre completo es obligatorio.",
      invalid_type_error: "El nombre debe ser texto.",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres."),

  correo: z
    .string({
      required_error: "El correo es obligatorio.",
    })
    .email("Debe ser un correo válido."),

  tipo_documento: z
    .enum(tiposDocumento, {
      required_error: "El tipo de documento es obligatorio.",
      invalid_type_error: "Tipo de documento inválido.",
    }),

  numero_documento: z
    .string({
      required_error: "El número de documento es obligatorio.",
    })
    .regex(/^[0-9]{5,15}$/, "El documento debe tener entre 5 y 15 números."),

  sede: z
    .enum(sedes, {
      required_error: "La sede es obligatoria.",
    }),

  rol: z
    .enum(roles, {
      required_error: "El rol es obligatorio.",
    }),
};

// -------------------------------------------------------
// 🟦 SCHEMA PARA CREAR USUARIO (requiere contraseña)
// -------------------------------------------------------
export const usuarioSchemaCrear = z.object({
  ...baseUsuarioSchema,

  contrasena: z
    .string({
      required_error: "La contraseña es obligatoria.",
    })
    .min(5, "La contraseña debe tener mínimo 5 caracteres."),
});

// -------------------------------------------------------
// 🟨 SCHEMA PARA EDITAR USUARIO (contraseña opcional)
// -------------------------------------------------------
export const usuarioSchemaEditar = z.object({
  ...baseUsuarioSchema,

  contrasena: z
    .string()
    .min(5, "La contraseña debe tener mínimo 5 caracteres.")
    .optional()
    .or(z.literal("")), // permite enviar "" si no se quiere cambiar
});
