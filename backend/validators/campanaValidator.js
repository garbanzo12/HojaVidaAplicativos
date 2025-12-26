import { z } from "zod";

// Enum idéntico al del modelo Prisma
const EstadoEnum = z.enum(["HABILITADO", "DESHABILITADO"]);

export const campanaSchema = z.object({
  // 🔹 Campos principales
  nombre_campana: z.string().min(1, "El nombre de la campaña es obligatorio"),
  director_operacion_abai: z.string().min(1, "El director de operación es obligatorio"),
  correo_director: z.string().email("El correo del director es inválido"),

  // 🔹 Opcionales
  segmento: z.string().optional().nullable(),
  nombre_gte_campana: z.string().optional().nullable(),
  correo_gte_campana: z.string().email("Correo del gerente inválido").optional().nullable(),

  // 🔹 Datos de ubicación y operación
  ubicacion_sedes: z.string().min(1, "La ubicación de las sedes es obligatoria"),
  puestos_operacion: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z.number().int().nonnegative({ message: "Los puestos de operación deben ser un número positivo" })
  ),
  puestos_estructura: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z.number().int().nonnegative({ message: "Los puestos de estructura deben ser un número positivo" })
  ),
  segmento_red: z.string().min(1, "El segmento de red es obligatorio"),

  // 🔹 Fechas
  fecha_actualizacion: z.preprocess(
    (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
    z.date({ message: "La fecha de actualización no es válida" })
  ),

  // 🔹 Contactos cliente
  nombre_contacto_cliente: z.string().min(1, "El nombre del contacto cliente es obligatorio"),
  correo_contacto_cliente: z.string().email("El correo del contacto cliente es inválido"),
  telefono_contacto_cliente: z.string().min(1, "El teléfono del contacto cliente es obligatorio"),

  // 🔹 Contactos comercial
  nombre_contacto_comercial: z.string().min(1, "El nombre del contacto comercial es obligatorio"),
  correo_contacto_comercial: z.string().email("El correo del contacto comercial es inválido"),
  telefono_contacto_comercial: z.string().min(1, "El teléfono del contacto comercial es obligatorio"),

  // 🔹 Soporte
  soporte_tecnico_abai: z.string().min(1, "El nombre del soporte técnico es obligatorio"),
  correo_soporte_abai: z.string().email("El correo del soporte técnico es inválido"),

  // 🔹 Opcionales adicionales
  servicios_prestados: z.string().optional().nullable(),
  
  // 🔹 Estado
  estado: EstadoEnum.optional().default("HABILITADO"),
});
