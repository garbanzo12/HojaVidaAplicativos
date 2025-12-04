import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient(); // Inicializo el cliente de prisma con una variable prismaimport { tuple } from "zod";
//import { tuple } from "zod";



//Obtener todas las campañas
export const getCampanas = async (req, res) => { // Hago mi funcion para obtener campañas
  try {
    const campanas = await prisma.campana.findMany({
      select: { id: true, nombre_campana: true , estado : true },
    });  // Obtengo todas las campañas y devuelvo su id, nombre y estado

    res.json({ success: true, campanas }); // Si la petición es satisfactoria devuelvo exito y las campañas
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({ success: false, message: "Error al obtener campañas" });
  } // Si hay un catch devuelvo 500 y un mensaje
};

//Obtener todas las campañas con detalles
export const getCampanasDetalles = async (req, res) => { // Creo mi funcion para obtener campañas con detalles
  try {
    const campanas = await prisma.campana.findMany({
        include : {
          aplicativos : true,
          matriz_escalamiento : true,
          matriz_escalamiento_global : true,
          usuarios : true,
        }
    }); // Obtengo campañas e incluyo los aplicativos, matrices y usuarios relacionados a cada campaña

    res.json(campanas); // Si la petición es exitosa devuelvo las campañas
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener campañas.",
    });
  } // Si hay un catch devuelvo 500 y un mensaje
};


// ✅ Obtener campaña por ID
export const getCampanaById = async (req, res) => { // Creo mi función para obtener campañas por id
  const { id } = req.params; // Obtengo mi id del cuerpo

  try {
    const campana = await prisma.campana.findUnique({
      where: { id: Number(id) },
        include: {
          aplicativos: true,
          matriz_escalamiento: true,
          matriz_escalamiento_global: true,
          usuarios : true,
      }, // Obtengo que corresponde a us id e le incluyo los aplciativos, matrices y usuario que esten relacionados a ella
    });

    if (!campana) {
      return res.status(404).json({ message: "Campaña no encontrada" });
    } // Si no hay campaña se devuelve 400 y un mensaje

    res.json(campana); // Se devuelven la campaña
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la campaña", error });
  } // Si hay un catch devuelvo 500 y un mensaje
};


// Crear nueva campaña
export const createCampana = async (req, res) => { // Creo mi función para crear una campaña
  try {
    const {
      nombre_campana,
      cliente,
      director_operacion_abai,
      correo_director,
      segmento,
      nombre_gte_campana,
      correo_gte_campana,
      ubicacion_sedes,
      puestos_operacion,
      puestos_estructura,
      segmento_red,
      fecha_actualizacion,
      nombre_contacto_cliente,
      correo_contacto_cliente,
      telefono_contacto_cliente,
      nombre_contacto_comercial,
      correo_contacto_comercial,
      telefono_contacto_comercial,
      soporte_tecnico_abai,
      correo_soporte_abai,
      servicios_prestados,
      estado,
    } = req.body; // Le asigno al cuerpo los datos que se esperan 

    // A continuación hago una normalización en los arrays que llegan desde el front de aplicativos, matrices y usuarios

    // Usuarios
    let usuarioIds = req.body["usuarioId[]"] || req.body.usuarioId || [];
    if (!Array.isArray(usuarioIds)) usuarioIds = [usuarioIds];
    usuarioIds = usuarioIds.map(Number).filter(Boolean);
    // Aplicativos
    let aplicativoIds = req.body["aplicativoId[]"] || req.body.aplicativoId || [];
    if (!Array.isArray(aplicativoIds)) aplicativoIds = [aplicativoIds];
    aplicativoIds = aplicativoIds.map(Number).filter(Boolean);

    // Matriz Escalamiento Normal
    let matrizIds = req.body["matrizId[]"] || req.body.matrizId || [];
    if (!Array.isArray(matrizIds)) matrizIds = [matrizIds];
    matrizIds = matrizIds.map(Number).filter(Boolean);

    // Matriz Escalamiento GLOBAL
    let matrizGlobalIds = req.body["matrizGlobalId[]"] || req.body.matrizGlobalId || [];
    if (!Array.isArray(matrizGlobalIds)) matrizGlobalIds = [matrizGlobalIds];
    matrizGlobalIds = matrizGlobalIds.map(Number).filter(Boolean);
    
    // console.log("📌 Usuarios IDs:", usuarioIds);
    // console.log("📌 APLICATIVOS IDs:", aplicativoIds);
    // console.log("📌 MATRIZ NORMAL IDs:", matrizIds);
    // console.log("📌 MATRIZ GLOBAL IDs:", matrizGlobalIds);

    // A continuación hago un tratamiento a los archivos(imagenes) que llegan al body
    const imagen_cliente = req.files?.imagen_cliente
      ? req.files.imagen_cliente[0].filename
      : null;

    const imagen_sede = req.files?.imagen_sede
      ? req.files.imagen_sede[0].filename
      : null;

    

    const nuevaCampana = await prisma.campana.create({
      data: {
        nombre_campana,
        cliente,
        director_operacion_abai,
        correo_director,
        segmento,
        nombre_gte_campana,
        correo_gte_campana,
        ubicacion_sedes,
        puestos_operacion: Number(puestos_operacion),
        puestos_estructura: Number(puestos_estructura),
        segmento_red,
        fecha_actualizacion: new Date(fecha_actualizacion),
        nombre_contacto_cliente,
        correo_contacto_cliente,
        telefono_contacto_cliente,
        nombre_contacto_comercial,
        correo_contacto_comercial,
        telefono_contacto_comercial,
        soporte_tecnico_abai,
        correo_soporte_abai,
        servicios_prestados,
        estado,

        // Relaciones
        usuarios: {
          connect: usuarioIds.map(id => ({ id }))
        },

        aplicativos: {
          connect: aplicativoIds.map(id => ({ id }))
        },

        matriz_escalamiento: {
          connect: matrizIds.map(id => ({ id }))
        },

        matriz_escalamiento_global: {
          connect: matrizGlobalIds.map(id => ({ id }))
        },

        imagen_cliente,
        imagen_sede,
      }, // Creo mi campaña y recorro los arrays de aplicativo, matrices y usuarios para relacionarlos a la campaña
    });

    // console.log("✅ APLICATIVOS GUARDADOS:", aplicativoIds);
    // console.log("✅ MATRIZ NORMAL GUARDADOS:", matrizIds);
    // console.log("✅ MATRIZ GLOBAL GUARDADOS:", matrizGlobalIds);

    res.json({
      success: true,
      message: "Campaña creada correctamente",
      nuevaCampana,
    }); // Si la petición es satisfactoria devuelvo mensaje de exito y la campaña

  } catch (error) {
    console.error("❌ Error al crear la campaña:", error);
    res.status(500).json({ error: "Error al crear la campaña" });
  } // Si hay un catch devuelvo 500 y un mensaje
};


// ✅ Actualizar campaña
export const updateCampana = async (req, res) => { // Creo mi función para actualizar camapaña
  const { id } = req.params; // Obtengo id del cuerpo
  const campanaId = Number(id); // Si el id llega como no numerico, se le convierte

  if (Number.isNaN(campanaId)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  } // Si no hay id o es invalido se devuelvo 400

  try {
    const existing = await prisma.campana.findUnique({
      where: { id: campanaId }
    }); // Busco la campaña que corresponda a su id

    if (!existing) {
      return res.status(404).json({ success: false, message: "Campaña no encontrada." });
    } // Si no exite devuelvo un 404

   
    const raw = { ...req.body };  // Body RAW (viene como strings)
    delete raw.id; // Elimino del raw el id

    const dataToUpdate = {}; // Inicializo una variable

    // --------- STRINGS ---------
    const camposString = [
      "nombre_campana",
      "cliente",
      "director_operacion_abai",
      "correo_director",
      "segmento",
      "nombre_gte_campana",
      "correo_gte_campana",
      "ubicacion_sedes",
      "segmento_red",
      "nombre_contacto_cliente",
      "correo_contacto_cliente",
      "telefono_contacto_cliente",
      "nombre_contacto_comercial",
      "correo_contacto_comercial",
      "telefono_contacto_comercial",
      "soporte_tecnico_abai",
      "correo_soporte_abai",
      "servicios_prestados",
      "estado"
    ];

    
    camposString.forEach(campo => {
      if (raw[campo] && raw[campo].trim() !== "") {
        dataToUpdate[campo] = raw[campo];
      }
    });// Si hay un dato para actualizar se agrega a la variable de actualización

    // --------- NÚMEROS ---------
    if (raw.puestos_operacion !== undefined) {
      const n = Number(raw.puestos_operacion);
      if (!Number.isNaN(n)) dataToUpdate.puestos_operacion = n;
    }

    if (raw.puestos_estructura !== undefined) {
      const n = Number(raw.puestos_estructura);
      if (!Number.isNaN(n)) dataToUpdate.puestos_estructura = n;
    }

    // --------- FECHA ---------
    if (raw.fecha_actualizacion) {
      const d = new Date(raw.fecha_actualizacion);
      if (!isNaN(d.getTime())) dataToUpdate.fecha_actualizacion = d;
    }

    // console.log("📌 Campos normales:", dataToUpdate);

    
    //  RELACIONES 
    // Para convertir string o array → array de números
    const parseIds = (input) => {
      if (!input) return [];
      if (Array.isArray(input)) return input.map(v => Number(v));
      return [Number(input)];
    };

    // Recibo lo que manda el frontend
    const usuarioIds = parseIds(raw.usuarioId);
    const aplicativosIds = parseIds(raw.aplicativoId);
    const matrizIds = parseIds(raw.matrizId);
    const matrizGlobalIds = parseIds(raw.matrizGlobalId);

    // console.log("📌 usuarioIds =>", usuarioIds);
    // console.log("📌 aplicativosIds =>", aplicativosIds);
    // console.log("📌 matrizIds =>", matrizIds);
    // console.log("📌 matrizGlobalIds =>", matrizGlobalIds);


    const updated = await prisma.campana.update({
      where: { id: campanaId }, // Actualizo la campaña segun su id
      data: {
        ...dataToUpdate, // Le asigno a data los datos que se van a actualizar

        // 1:N usuarios
        ...(usuarioIds.length > 0 && {
          usuarios: {
            set: usuarioIds.map(id => ({ id }))
          }
        }),
        // 1:N aplicativos
        ...(aplicativosIds.length > 0 && {
          aplicativos: {
            set: aplicativosIds.map(id => ({ id }))
          }
        }),

        // M:N matriz_escalamiento
        ...(matrizIds.length > 0 && {
          matriz_escalamiento: {
            set: matrizIds.map(id => ({ id }))
          }
        }),

        // M:N matriz_escalamiento_global
        ...(matrizGlobalIds.length > 0 && {
          matriz_escalamiento_global: {
            set: matrizGlobalIds.map(id => ({ id }))
          }
        })
      }
    });

    return res.json({
      success: true,
      message: "Campaña actualizada correctamente",
      data: updated
    }); // Si la petición es satisfactoria devuelvo un mensaje de exito y el data

  } catch (error) {
    console.error("❌ ERROR UPDATE:", error);
    return res.status(500).json({ success: false, message: "Error al actualizar", error });
  } // Si hay un catch devuelvo 500 y un mensaje
};







export const updateEstadoCampana = async (req, res) => { // Creo mi función para actualizar campaña
  const { id } = req.params; // Obtengo el id del cuerpo

  try {
    //  Busco la campaña por ID
    const campana = await prisma.campana.findUnique({
      where: { id: Number(id) }, // Busco la campaña segun su id
    });

   
    if (!campana) {
      return res.status(404).json({
        success: false,
        message: "Campaña no encontrada.",
      });
    }  // Si no existe devuelvo 404 y mensaje 

    const nuevoEstado =
      campana.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";    //  Determino el nuevo estado


    
    const campanaActualizada = await prisma.campana.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    }); // Actualizo la la campaña segun id y data

    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: campanaActualizada,
    }); // Si la petición es satisfactoria devuelvo mensaje de exito y data

  } catch (error) {
    console.error("Error al actualizar el estado de la campaña:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la campaña.",
    });
  } // Si hay un catch devuelvo 500 y un mensaje
};




// Obtener campañas por usuario
export const obtenerCampanasPorUsuario = async (req, res) => { // Creo mi función para obtener campañas segun usuario
  try {
    const usuarioId = Number(req.params.id); // Obtengo el id del usuario y lo convierto a numerico

    if (!usuarioId || isNaN(usuarioId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    } // Si no hay usuario o es invalido devuelvo 400

    const campanas = await prisma.campana.findMany({
      where: {
        usuarios: {
          some: { id: usuarioId }
        }
      },
      include: {
        usuarios: true,
        aplicativos: true,
        matriz_escalamiento: true,
        matriz_escalamiento_global: true
      } // Devuelvo las campañas donde le usuario tenga el id que se esta esperando, ademas se incluyen los aplciativos,matrices y usuarios
    });

    res.json(campanas); // Si la petición es exitosa se devuelven las campañas

  } catch (error) {
    console.error("❌ Error al obtener campañas por usuario:", error);
    res.status(500).json({ error: "Error al obtener campañas por usuario" });
  } // Si hay un catch devuelvo 500 y un mensaje
};


