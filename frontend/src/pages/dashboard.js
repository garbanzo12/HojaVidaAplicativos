import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Drawer,
  Button,
  Divider,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Card,
  CardContent,
  Modal,
  Paper,
} from "@mui/material";
import {
  AccountCircle,
  ExpandMore,
  Logout,
  Person,
  Warning,
} from "@mui/icons-material";
import logo from "../img/abai-logo.png";
import FormularioModal from "./formulario";
import FormularioAplicativo from "./FormularioAplicativo";
import TablaCampana from "./tablaCampana";
import TablaAplicativos from "./tablaAplicativos";
import FormularioMatriz from "./formularioMatriz";
import FormularioMatrizGlobal from "./formularioMatrizGlobal.js";
import TablaMatriz from "./tablaMatriz";
import TablaGlobal from "./tablaGlobal";
import FormularioUsuario from "./formularioUsuario";
import TablaUsuarios from "./tablaUsuarios";
import { jwtDecode } from "jwt-decode";
import useAuthGuard from "../hooks/useAuthGuard.js";
import { useAuth } from "../context/AuthContext";



const drawerWidth = 260;

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth(); 
  const [userDB, setUserDB] = React.useState(null);
  const [info, setInfo] = React.useState(null);



  
    useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          `http://localhost:4000/usuario/nombreusuario/${user.id}`
        );

        setUserDB(response.data);
      } catch (error) {
        console.error(error);
        logout();
      }
      const infos = await axios.get(
          `http://localhost:4000/infogeneral/`
        );
        setInfo(infos.data);
        

    };

      fetchUser();
    }, []);
  useAuthGuard(["admin", "proveedor"]);
  const { logout } = useAuth();
  const [menuAnchor, setMenuAnchor] = React.useState({});
  const [abrirFormulario, setAbrirFormulario] = React.useState(false);
  const [abrirAplicativo, setAbrirAplicativo] = React.useState(false);
  const [abrirMatrizGlobal, setAbrirMatrizGlobal] = React.useState(false);
  const [abrirMatriz, setAbrirMatriz] = React.useState(false);
  const [abrirUsuarios, setAbrirUsuarios] = React.useState(false);
  const [seccionActual, setSeccionActual] = React.useState("inicio");
  const can = (rolesAllowed) => rolesAllowed.includes(userDB?.rol);

  const handleMenuClick = (event, menuName) => {
    setMenuAnchor({ ...menuAnchor, [menuName]: event.currentTarget });
  };

  const handleMenuClose = (menuName) => {
    setMenuAnchor({ ...menuAnchor, [menuName]: null });
  };

  const goTo = (route) => {
    setSeccionActual(route);
  };

  const volverAlInicio = () => {
    setSeccionActual("inicio");
  };

  const estiloMenu = {
  "& .MuiPaper-root": {
    backgroundColor: "#00395e", // azul oscuro similar a la imagen
    color: "white",
    borderRadius: "8px",
    paddingTop: "6px",
    paddingBottom: "6px",
    minWidth: "200px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
  },
};

const estiloItem = {
  padding: "10px 20px",
  fontSize: "14px",
  display: "block",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
};

  const sidebarItems = [
    { label: "Formularios", type: "dropdown" },
  
    { label: "Usuarios", route: "Usuario", roles: ["administrador"] },
    { label: "Campaña", route: "campana" },
    { label: "Aplicativos", route: "abai" },
    { label: "Matrizes ", type: "dropdownMatriz" },
  ];
  
  
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(180deg, #e3f2fd 0%, #fffde7 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* === SIDEBAR === */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#002b5b",
            color: "white",
            borderRight: "4px solid #D4AF37",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "4px 0 15px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          {/* Logo */}
          <Box
            onClick={volverAlInicio}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.4)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 0px 15px rgba(255, 230, 1, 0.6)",
              },
            }}
          >
            <img
              src={logo}
              alt="Logo ABAI"
              style={{
                width: "80%",
                height: "80%",
                objectFit: "contain",
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              color: "#fff",
            }}
          >


            PANEL {userDB?.rol?.toUpperCase()}

          </Typography>


          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

          {/* Botones laterales */}
          {sidebarItems.filter(item => !item.roles || can(item.roles))
          .map((item, index) => (
            <Box key={index}>
              {item.type === "dropdown" ? (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ExpandMore />}
                    onClick={(e) => handleMenuClick(e, item.label)}
                    sx={{
                      my: 1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      textTransform: "none",
                      borderRadius: "12px",
                      fontWeight: "500",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                    }}
                  >
                    {item.label.toUpperCase()}
                  </Button>
                  <Menu
                    anchorEl={menuAnchor[item.label]}
                    open={Boolean(menuAnchor[item.label])}
                    onClose={() => handleMenuClose(item.label)}
                  >
                    
                    {can(["administrador"]) && (
                    <MenuItem
                        onClick={() => {
                          handleMenuClose(item.label);
                          setAbrirUsuarios(true);
                        }}
                    >
                      Crear Usuario
                    </MenuItem>
                    )}
                    
                    {can(["administrador"]) && (<MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        setAbrirFormulario(true);
                      }}
                    >
                      Crear Campaña
                    </MenuItem>)}
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        setAbrirAplicativo(true);
                      }}
                    >
                      Crear Aplicativos
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        setAbrirMatriz(true);
                      }}
                    >
                      Crear Matriz
                    </MenuItem>
                    
                     {can(["administrador"]) && (<MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        setAbrirMatrizGlobal(true);
                      }}
                    >
                      Crear Matriz Global
                    </MenuItem>)}


                  </Menu>
                </>
              ) : item.type === "dropdownMatriz" ? (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ExpandMore />}
                    onClick={(e) => handleMenuClick(e, item.label)}
                    sx={{
                      my: 1,
                      backgroundColor:
                        seccionActual === "matriz" ||
                        seccionActual === "global"
                          ? "#ffe601ff"
                          : "rgba(255,255,255,0.1)",
                      color:
                        seccionActual === "matriz" ||
                        seccionActual === "global"
                          ? "#002b5b"
                          : "#fff",
                      textTransform: "none",
                      borderRadius: "12px",
                      fontWeight: "500",
                      "&:hover": {
                        backgroundColor:
                          seccionActual === "matriz" ||
                          seccionActual === "global"
                            ? "#fff176"
                            : "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    {item.label.toUpperCase()}
                  </Button>
                  <Menu
                    anchorEl={menuAnchor[item.label]}
                    open={Boolean(menuAnchor[item.label])}
                    onClose={() => handleMenuClose(item.label)}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        goTo("matriz");
                      }}
                    >
                      Matriz
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        goTo("global");
                      }}
                    >
                      Matriz Global
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    my: 1,
                    backgroundColor:
                      seccionActual === item.route
                        ? "#ffe601ff"
                        : "rgba(255,255,255,0.1)",
                    color: seccionActual === item.route ? "#002b5b" : "#fff",
                    textTransform: "none",
                    borderRadius: "12px",
                    fontWeight: "500",
                    "&:hover": {
                      backgroundColor:
                        seccionActual === item.route
                          ? "#fff176"
                          : "rgba(255,255,255,0.25)",
                    },
                  }}
                  onClick={() => goTo(item.route)}
                >
                  {item.label.toUpperCase()}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* Usuario */}
        <Box sx={{ textAlign: "center", pb: 3 }}>
          <IconButton sx={{ color: "white" }}>
            <AccountCircle sx={{ fontSize: 45 }} />
          </IconButton>
          <Typography>{userDB?.nombre_completo}</Typography>
          <Button
                variant="contained"
                startIcon={<Logout />}
                sx={{
                  mt: 1,
                  backgroundColor: "#fff",
                  color: "#002b5b",
                  textTransform: "none",
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
                onClick={logout}
            >
              SALIR
            </Button>
        </Box>
      </Drawer>

      {/* === CONTENIDO PRINCIPAL === */}
      <Box sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
  {seccionActual === "inicio" && (
    <Box
      sx={{
        height: "100%",
        px: 4,
        pt: 4,
        overflow: "hidden",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography
          sx={{
            fontSize: "2.4rem",
            fontWeight: "900",
            color: "#0A1F44",
            letterSpacing: "1px",
          }}
        >
          MENÚ PRINCIPAL
        </Typography>

        <Typography sx={{ color: "#6B7280", mt: 0.5, fontSize: "1.05rem" }}>
          Resumen del estado del sistema
        </Typography>

        <Box
          sx={{
            width: 150,
            height: 4,
            mx: "auto",
            mt: 1.5,
            borderRadius: 3,
            background: "linear-gradient(90deg,#D4AF37,#FFD700)",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 4,
          maxWidth: 1450,
          mx: "auto",
          mb: 4,
        }}
      >
        {
          
        [
           { label: "Campañas Activas", value: info?.campanas?.habilitadas ?? "-" },
            { label: "Campañas Inactivas", value: info?.campanas?.deshabilitadas ?? "-" },

            { label: "Usuarios Activos", value: info?.usuarios?.habilitados ?? "-" },
            { label: "Usuarios Inactivos", value: info?.usuarios?.deshabilitados ?? "-" },

            { label: "Aplicativos Activos", value: info?.aplicativos?.habilitados ?? "-" },
            { label: "Aplicativos Inactivos", value: info?.aplicativos?.deshabilitados ?? "-" },

            { label: "Matriz Esc. Activas", value: info?.matriz_escalamiento?.habilitada ?? "-" },
            { label: "Matriz Esc. Inactivas", value: info?.matriz_escalamiento?.deshabilitada ?? "-" },

            { label: "Matriz Global Activas", value: info?.matriz_escalamiento_global?.habilitada ?? "-" },
            { label: "Matriz Global Inactivas", value: info?.matriz_escalamiento_global?.deshabilitada ?? "-" },
        ].map((item, idx) => (
          <Card
            key={idx}
            sx={{
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              transition: "0.3s",
              "&:hover": {
                borderColor: "#D4AF37",
                boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#6B7280",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "2.3rem",
                  fontWeight: "900",
                  color: "#0A1F44",
                  mt: 1,
                }}
              >
                {item.value}
              </Typography>

              <Box
                sx={{
                  width: 65,
                  height: 4,
                  mx: "auto",
                  mt: 1.5,
                  borderRadius: 3,
                  background: "#D4AF37",
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

        <Typography
          sx={{
            textAlign: "center",
            color: "#0A1F44",
            fontWeight: "900",
            letterSpacing: "2px",
            mb: 3,
            mt: 6,
            fontSize: "1.4rem",
          }}
        >
          RESUMEN TOTAL
        </Typography>

        <Box
          sx={{
            maxWidth: 1450,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
            mb: 6,
          }}
        >
          {[
            { label: "Total Campañas", value: info?.campanas?.total ?? "-" },
            { label: "Total Usuarios", value: info?.usuarios?.total ?? "-" },
            { label: "Total Aplicativos", value: info?.aplicativos?.total ?? "-" },
            { label: "Total Matriz Escalamiento", value: info?.matriz_escalamiento?.total ?? "-" },
            { label: "Total Matriz Global", value: info?.matriz_escalamiento_global?.total ?? "-" },
          ].map((item, i) => (
            <Box
                key={i}
                sx={{
                  background: "#FFFFFF",
                  borderRadius: 4,
                  p: 3,
                  textAlign: "center",
                  border: "1px solid #E5E7EB",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",

                  

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    borderColor: "#D4AF37",
                  },
                }}
              >
              <Typography
                sx={{
                  fontSize: "2.4rem",
                  fontWeight: "900",
                  color: "#002b5b",
                }}
              >
                {item.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "#6B7280",
                  mt: 0.5,
                }}
              >
                {item.label}
              </Typography>

              <Box
                sx={{
                  width: 45,
                  height: 4,
                  mx: "auto",
                  mt: 1.5,
                  borderRadius: 3,
                  background: "#D4AF37",
                }}
              />
            </Box>
          ))}
        </Box>
    </Box>
    
  )}

    {seccionActual === "campana" && <TablaCampana />}
        {seccionActual === "abai" && <TablaAplicativos />}
        {seccionActual === "matriz" && <TablaMatriz />}
        {seccionActual === "global" && <TablaGlobal />}
        {seccionActual === "Usuario" && can(["administrador"]) && <TablaUsuarios />}
</Box>

      {/* === MODALES === */}
      {abrirFormulario && (
        <FormularioModal
          open={abrirFormulario}
          onClose={() => setAbrirFormulario(false)}
        />
      )}

      {abrirAplicativo && (
        <Modal open={abrirAplicativo} onClose={() => setAbrirAplicativo(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              p: 2,
            }}
          >
            <Paper
              elevation={6}
              sx={{
                width: "90%",
                maxWidth: 800,
                borderRadius: 3,
                p: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <FormularioAplicativo onClose={() => setAbrirAplicativo(false)} />
            </Paper>
          </Box>
        </Modal>
      )}

      {abrirUsuarios && (
        <Modal open={abrirUsuarios} onClose={() => setAbrirUsuarios(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              p: 2,
            }}
          >
            <Paper
              elevation={6}
              sx={{
                width: "90%",
                maxWidth: 800,
                borderRadius: 3,
                p: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <FormularioUsuario onClose={() => setAbrirUsuarios(false)} />
            </Paper>
          </Box>
        </Modal>
      )}

      {abrirMatriz && (
        <Modal open={abrirMatriz} onClose={() => setAbrirMatriz(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              p: 2,
            }}
          >
            <FormularioMatriz onClose={() => setAbrirMatriz(false)} />
          </Box>
        </Modal>
      )}
      {abrirMatrizGlobal && (
        <Modal open={abrirMatrizGlobal} onClose={() => setAbrirMatrizGlobal(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              p: 2,
            }}
          >
            <FormularioMatrizGlobal onClose={() => setAbrirMatrizGlobal(false)} />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Dashboard;
