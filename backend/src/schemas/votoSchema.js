import { z } from "zod";

const id = z.coerce.number().int().positive();

export const votoSchema = z
  .object({
    votante_identificacion: z
      .string()
      .trim()
      .regex(/^\d{6,12}$/, "La identificación debe tener entre 6 y 12 dígitos"),
    sede_id: id,
    facultad_id: id,
    programa_id: id,
    candidato_id: id,
  })
  .strict();
