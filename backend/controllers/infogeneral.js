import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient();


export const obtenerResumenDashboard = async (req, res) => {
  try {
    const [
      // CAMPAÑAS
      totalCampanas,
      campanasHabilitadas,
      campanasDeshabilitadas,

      // USUARIOS
      totalUsuarios,
      usuariosHabilitados,
      usuariosDeshabilitados,

      // APLICATIVOS
      totalAplicativos,
      aplicativosHabilitados,
      aplicativosDeshabilitados,

      // MATRIZ ESCALAMIENTO
      totalMatrizEsc,
      matrizEscHabilitada,
      matrizEscDeshabilitada,

      // MATRIZ GLOBAL
      totalMatrizGlobal,
      matrizGlobalHabilitada,
      matrizGlobalDeshabilitada,
    ] = await Promise.all([
      // CAMPANAS
      prisma.campana.count(),
      prisma.campana.count({ where: { estado: "HABILITADO" } }),
      prisma.campana.count({ where: { estado: "DESHABILITADO" } }),

      // USUARIOS
      prisma.usuario.count(),
      prisma.usuario.count({ where: { estado: "HABILITADO" } }),
      prisma.usuario.count({ where: { estado: "DESHABILITADO" } }),

      // APLICATIVOS
      prisma.aplicativo.count(),
      prisma.aplicativo.count({ where: { estado: "HABILITADO" } }),
      prisma.aplicativo.count({ where: { estado: "DESHABILITADO" } }),

      // MATRIZ ESC
      prisma.matriz_escalamiento.count(),
      prisma.matriz_escalamiento.count({ where: { estado: "HABILITADO" } }),
      prisma.matriz_escalamiento.count({ where: { estado: "DESHABILITADO" } }),

      // MATRIZ GLOBAL
      prisma.matriz_escalamiento_global.count(),
      prisma.matriz_escalamiento_global.count({ where: { estado: "HABILITADO" } }),
      prisma.matriz_escalamiento_global.count({ where: { estado: "DESHABILITADO" } }),
    ]);

    return res.json({
      campanas: {
        total: totalCampanas,
        habilitadas: campanasHabilitadas,
        deshabilitadas: campanasDeshabilitadas,
      },

      usuarios: {
        total: totalUsuarios,
        habilitados: usuariosHabilitados,
        deshabilitados: usuariosDeshabilitados,
      },

      aplicativos: {
        total: totalAplicativos,
        habilitados: aplicativosHabilitados,
        deshabilitados: aplicativosDeshabilitados,
      },

      matriz_escalamiento: {
        total: totalMatrizEsc,
        habilitada: matrizEscHabilitada,
        deshabilitada: matrizEscDeshabilitada,
      },

      matriz_escalamiento_global: {
        total: totalMatrizGlobal,
        habilitada: matrizGlobalHabilitada,
        deshabilitada: matrizGlobalDeshabilitada,
      },
    });
  } catch (error) {
    console.error("Error obteniendo resumen del dashboard:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};