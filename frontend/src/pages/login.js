import React, { useState,useEffect } from "react";
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";
import { Visibility, VisibilityOff, } from "@mui/icons-material";
import logo from "../img/abai-logo.png";
import Fondo from "../img/abai-galeria8.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user,login } = useAuth();  

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        correo: form.email,
        contrasena: form.password,
      });

      console.log("RESPUESTA DEL BACKEND:", res.data);

      // Guardar token
      localStorage.setItem("token", res.data.token);

      // ✔ CORRECTO: enviar token y usuario al contexto
      login(res.data.token, res.data.usuario);

      alert("Login exitoso");
      navigate("/dashboard");

    } catch (error) {
      console.log("ERROR:", error);
      alert(error.response?.data?.error || "Error al iniciar sesión");
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Imagen de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.60,
          zIndex: 0
        }}
      />

      {/* Círculos decorativos */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      {/* Card principal */}
      <Card
        sx={{
          width: '100%',
          maxWidth: 450,
          position: 'relative',
          zIndex: 10,
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <CardContent sx={{ p: 5 }}>
          {/* Logo */}
           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 110, // más grande
                height: 120,
                borderRadius: 3,
                display: 'flex',  
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <img
                src={logo}
                alt="Logo ABAI"
                style={{
                  width: "90%",
                  height: "90%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>

          {/* Título */}
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Bienvenido
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4
            }}
          >
            Inicia sesión para continuar
          </Typography>

          {/* Formulario */}
          <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Correo electrónico"
              variant="outlined"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#667eea'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                    borderWidth: 2
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea'
                }
              }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#FDC745'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#003cffff',
                    borderWidth: 2
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#000000ff'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Recordar y olvidaste contraseña */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: '#667eea',
                      '&.Mui-checked': {
                        color: '#667eea'
                      }
                    }}
                  />
                }
                label={<Typography variant="body2">Recordarme</Typography>}
              />
              <Button
                sx={{
                  textTransform: 'none',
                  color: '#0b32e2ff',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#c79f1cff'
                  }
                }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Box>

            {/* Botón de login */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                py: 1.5,
                mt: 1,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1c4ae2ff 0%, #3a6ad3ff 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                fontSize: 16,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2a48f5ff 0%, #346feeff 100%)',
                  boxShadow: '0 6px 20px #FDC745',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Iniciar sesión
            </Button>
          </Box>

          {/* Divider */}
          <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary">
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;