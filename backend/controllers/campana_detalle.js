import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Ruta de prueba
export const testConnection = (req, res) => {
  res.send("Servidor y Prisma funcionando correctamente 🚀");
};

// ✅ Obtener todas las campañas con relaciones
export const getCampanas = async (req, res) => {
  try {
    const detalles = await prisma.campanas_detalle.findMany({
      include: {
        campana: true,
        gestor: true,
        datosGenerales: true,
        contacto: true,
        imagen: true,
      },
    });
    res.status(200).json(detalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las campañas con detalles", error });
  }
};

// ✅ Obtener campaña por ID
export const getCampanaById = async (req, res) => {
  const { id } = req.params;

  try {
    const detalle = await prisma.campanas_detalle.findUnique({
      where: { id: Number(id) },
      include: {
        campana: true,
        gestor: true,
        datosGenerales: true,
        contacto: true,
        imagen: true,
      },
    });

    if (!detalle) {
      return res.status(404).json({ message: "Campaña no encontrada" });
    }

    res.status(200).json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el detalle de la campaña", error });
  }
};

// ✅ Crear campaña
export const createCampana = async (req, res) => {
  const {
    nombre_campana,
    cliente,
    director_operacion,
    correo_director,
    fecha_actualizacion,
    servicios_prestados,

    gestor_segmento,
    gestor_nombre,
    gestor_correo,

    ubicacion_sede,
    puestos_operacion,
    puestos_estructura,
    segmento_red,

    contacto_tipo,
    contacto_nombre,
    contacto_correo,
    contacto_telefono,
    contacto_empresa,

    imagen_url,
  } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const nuevaCampana = await tx.campanas.create({
        data: {
          nombre_campana,
          cliente,
          director_operacion,
          correo_director,
          fecha_actualizacion: new Date(fecha_actualizacion),
          servicios_prestados,
        },
      });

      const nuevoGestor = await tx.gestores_campana.create({
        data: {
          campana_id: nuevaCampana.id,
          segmento: gestor_segmento,
          nombre: gestor_nombre,
          correo: gestor_correo,
        },
      });

      const nuevosDatos = await tx.datos_generales.create({
        data: {
          campana_id: nuevaCampana.id,
          ubicacion_sede,
          puestos_operacion,
          puestos_estructura,
          segmento_red,
        },
      });

      const nuevoContacto = await tx.contactos.create({
        data: {
          campana_id: nuevaCampana.id,
          tipo_contacto: contacto_tipo,
          nombre: contacto_nombre,
          correo: contacto_correo,
          telefono: contacto_telefono,
          empresa: contacto_empresa,
        },
      });

      const nuevaImagen = imagen_url
        ? await tx.imagen.create({ data: { imagen: imagen_url } })
        : null;

      const detalle = await tx.campanas_detalle.create({
        data: {
          campana_id: nuevaCampana.id,
          gestor_id: nuevoGestor.id,
          datos_generales_id: nuevosDatos.id,
          contacto_id: nuevoContacto.id,
          imagen_id: nuevaImagen ? nuevaImagen.id : null,
        },
      });

      return { campana: nuevaCampana, gestor: nuevoGestor, datos_generales: nuevosDatos, contacto: nuevoContacto, imagen: nuevaImagen, detalle };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la campaña y sus relaciones" });
  }
};

// ✅ Eliminar campaña
export const deleteCampana = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.campanas.delete({ where: { id } });
    res.json({ message: "Campaña eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la campaña" });
  }
};
