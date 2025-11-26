import React from "react";
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
  let user = null;

  try {
    if (token) {
      user = jwtDecode(token);
    }
  } catch (error) {
    console.error("Token inválido, cerrando sesión...");
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  useAuthGuard(["admin", "proveedor"]);
  const { logout } = useAuth();

  const [menuAnchor, setMenuAnchor] = React.useState({});
  const [abrirFormulario, setAbrirFormulario] = React.useState(false);
  const [abrirAplicativo, setAbrirAplicativo] = React.useState(false);
  const [abrirMatrizGlobal, setAbrirMatrizGlobal] = React.useState(false);
  const [abrirMatriz, setAbrirMatriz] = React.useState(false);
  const [abrirUsuarios, setAbrirUsuarios] = React.useState(false);
  const [seccionActual, setSeccionActual] = React.useState("inicio");
  const can = (rolesAllowed) => rolesAllowed.includes(user?.rol);

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
            borderRight: "4px solid #D68910",
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
            PANEL {user?.rol?.toUpperCase()}
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
          <Typography>{user?.correo}</Typography>
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
      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
        {seccionActual === "inicio" && (
          <>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              color="#002b5b"
              mb={4}
            >
              MENÚ PRINCIPAL DE APLICATIVOS
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              <Card
                sx={{
                  width: 220,
                  textAlign: "center",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Person sx={{ fontSize: 45, color: "#1565c0" }} />
                  <Typography variant="subtitle1" color="#0d47a1">
                    CAMPAÑAS ACTIVAS
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="#002b5b">
                    126
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  width: 220,
                  textAlign: "center",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Warning sx={{ fontSize: 45, color: "#fbc02d" }} />
                  <Typography variant="subtitle1" color="#795548">
                    CAMPAÑAS INACTIVAS
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="#5d4037">
                    45
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </>
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
