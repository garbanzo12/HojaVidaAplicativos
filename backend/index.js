import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ✅ Ruta de prueba: comprobar conexión
app.get("/", (req, res) => {
  res.send("Servidor y Prisma funcionando correctamente 🚀");
});

// ✅ Obtener todas las campañas

// ✅ Obtener todas las campañas con relaciones directas

// ✅ Obtener todas las campañas con sus relaciones
app.get("/campanas", async (req, res) => {
  try {
const detalles = await prisma.Campanas_detalle.findMany({
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
    res.status(500).json({ message: 'Error al obtener las campañas con detalles', error });
  }
});

app.get("/campanas/:id", async (req, res) => {
      const { id } = req.params;

  try {
     const detalle = await prisma.Campanas_detalle.findUnique({
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
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    res.status(200).json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el detalle de la campañsa', error });
  }
});

// ✅ Crear una nueva campaña
app.post("/campanas", async (req, res) => {
  const {
    // Información principal
    nombre_campana,
    cliente,
    director_operacion,
    correo_director,
    fecha_actualizacion,
    servicios_prestados,

    // Gestores de campaña
    gestor_segmento,
    gestor_nombre,
    gestor_correo,

    // Datos generales
    ubicacion_sede,
    puestos_operacion,
    puestos_estructura,
    segmento_red,

    // Contactos
    contacto_tipo,
    contacto_nombre,
    contacto_correo,
    contacto_telefono,
    contacto_empresa,

    // Imagen (opcional)
    imagen_url
  } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Crear campaña principal
      const nuevaCampana = await tx.campanas.create({
        data: {
          nombre_campana,
          cliente,
          director_operacion,
          correo_director,
          fecha_actualizacion: new Date(fecha_actualizacion),
          servicios_prestados
        }
      });

      // 2️⃣ Crear gestor de campaña
      const nuevoGestor = await tx.gestores_campana.create({
        data: {
          campana_id: nuevaCampana.id,
          segmento: gestor_segmento,
          nombre: gestor_nombre,
          correo: gestor_correo
        }
      });

      // 3️⃣ Crear datos generales
      const nuevosDatos = await tx.datos_generales.create({
        data: {
          campana_id: nuevaCampana.id,
          ubicacion_sede,
          puestos_operacion,
          puestos_estructura,
          segmento_red
        }
      });

      // 4️⃣ Crear contacto
      const nuevoContacto = await tx.contactos.create({
        data: {
          campana_id: nuevaCampana.id,
          tipo_contacto: contacto_tipo,
          nombre: contacto_nombre,
          correo: contacto_correo,
          telefono: contacto_telefono,
          empresa: contacto_empresa
        }
      });

      // 5️⃣ Crear imagen (opcional)
      const nuevaImagen = imagen_url
        ? await tx.imagen.create({
            data: { imagen: imagen_url }
          })
        : null;

      // 6️⃣ Registrar en campanas_detalle
      const detalle = await tx.campanas_detalle.create({
        data: {
          campana_id: nuevaCampana.id,
          gestor_id: nuevoGestor.id,
          datos_generales_id: nuevosDatos.id,
          contacto_id: nuevoContacto.id,
          imagen_id: nuevaImagen ? nuevaImagen.id : null
        }
      });

      return {
        campana: nuevaCampana,
        gestor: nuevoGestor,
        datos_generales: nuevosDatos,
        contacto: nuevoContacto,
        imagen: nuevaImagen,
        detalle
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la campaña y sus relaciones" });
  }
});


// ✅ Eliminar campaña por ID
app.delete("/campanas/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.campanas.delete({
      where: { id }
    });

    res.json({ message: "Campaña eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la campaña" });
  }
});

// ✅ Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
