import { AppError } from "../utils/AppError.js";

export const notFound = (req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
};

// Los errores controlados se devuelven tal cual; el resto se registra en el servidor
// y el cliente solo recibe un mensaje genérico, sin detalles de la base de datos.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "El cuerpo de la petición no es JSON válido" });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "La petición es demasiado grande" });
  }

  console.error(err);
  return res.status(500).json({ message: "Error interno del servidor" });
};
