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
} from "@mui/material";
import {
  AccountCircle,
  ExpandMore,
  Logout,
  Person,
  Warning,
} from "@mui/icons-material";
import Slider from "react-slick";
import logo from "../img/abai-logo.png";
import FormularioModal from "./formulario"; 

const drawerWidth = 260;

const Dashboard = () => {
  const [menuAnchor, setMenuAnchor] = React.useState({});
  const [abrirFormulario, setAbrirFormulario] = React.useState(false);

  const handleMenuClick = (event, menuName) => {
    setMenuAnchor({ ...menuAnchor, [menuName]: event.currentTarget });
  };

  const handleMenuClose = (menuName) => {
    setMenuAnchor({ ...menuAnchor, [menuName]: null });
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  const sidebarItems = [
    { label: "Formularios", type: "dropdown" },
    { label: "Aplicativo ABAI", route: "/abai" },
    { label: "App Proveedor", route: "/proveedor" },
    { label: "App Internet", route: "/internet" },
    { label: "Matriz Escalamiento", route: "/matriz-escalamiento" },
  ];

  const carouselImages = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(180deg, #e3f2fd 0%, #fffde7 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* --- SIDEBAR --- */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#002b5b",
            color: "white",
            borderRight: "4px solid #ffe601ff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "4px 0 15px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Box
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
            PANEL ADMIN
          </Typography>

          <Divider
            sx={{
              my: 2,
              borderColor: "rgba(255,255,255,0.2)",
            }}
          />

          {/* --- BOTONES DEL SIDEBAR --- */}
          {sidebarItems.map((item, index) => (
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
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.25)",
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
                        setAbrirFormulario(true);
                      }}
                    >
                      Crear campaña
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleMenuClose(item.label);
                        setAbrirFormulario(true);
                      }}
                    >
                      Crear aplicativos
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    my: 1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "12px",
                    fontWeight: "500",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.25)",
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

        {/* --- USUARIO --- */}
        <Box sx={{ textAlign: "center", pb: 3 }}>
          <IconButton sx={{ color: "white" }}>
            <AccountCircle sx={{ fontSize: 45 }} />
          </IconButton>
          <Typography>Administrador</Typography>
          <Button
            variant="contained"
            startIcon={<Logout />}
            sx={{
              mt: 1,
              backgroundColor: "#fff",
              color: "#002b5b",
              textTransform: "none",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            SALIR
          </Button>
        </Box>
      </Drawer>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="#002b5b"
          mb={4}
        >
          MENÚ PRINCIPAL DE APLICATIVOS
        </Typography>

        <Box sx={{ maxWidth: "800px", mx: "auto", mb: 6 }}>
          <Slider {...sliderSettings}>
            {carouselImages.map((img, index) => (
              <Box key={index}>
                <img
                  src={img}
                  alt={`slide-${index}`}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

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
              background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
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
              background: "linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
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

        {/* --- MODAL FORMULARIOS --- */}
        {abrirFormulario && (
          <FormularioModal
            open={abrirFormulario}
            onClose={() => setAbrirFormulario(false)}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
