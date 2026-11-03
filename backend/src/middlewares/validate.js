// Valida body y params contra esquemas de Zod y reemplaza los valores por los ya convertidos.
export const validate = ({ body, params } = {}) => (req, res, next) => {
  for (const [key, schema] of [["body", body], ["params", params]]) {
    if (!schema) continue;

    const result = schema.safeParse(req[key] ?? {});
    if (!result.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: result.error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensaje: issue.message,
        })),
      });
    }

    req.validated = { ...req.validated, [key]: result.data };
  }

  next();
};
