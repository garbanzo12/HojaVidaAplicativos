// backend/validators/validateMiddleware.js
export const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Errores de validación",
        errors,
      });
    }

    req.validatedData = result.data;
    next();
  } catch (error) {
    console.error("Error inesperado en validación:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor durante la validación",
    });
  }
};
