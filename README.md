# HojaVidaAplicativos

Backend API para la gestión de Hoja de Vida de Aplicativos.

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo `.env.example` a `.env`
2. Configura las variables de entorno en el archivo `.env`:
   - `PORT`: Puerto del servidor (por defecto 3000)
   - `DB_HOST`: Host de la base de datos
   - `DB_USER`: Usuario de la base de datos
   - `DB_PASSWORD`: Contraseña de la base de datos
   - `DB_NAME`: Nombre de la base de datos

## Uso

### Modo desarrollo
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

## Estructura del proyecto

```
HojaVidaAplicativos/
├── src/
│   ├── config/          # Configuraciones (base de datos, etc.)
│   ├── controllers/     # Controladores de la aplicación
│   ├── models/          # Modelos de datos
│   └── routes/          # Definición de rutas
├── server.js            # Archivo principal del servidor
├── .env                 # Variables de entorno
└── package.json         # Dependencias del proyecto
```

## Endpoints

- `GET /` - Mensaje de bienvenida
- `GET /api/*` - Endpoints de la API (a implementar)
