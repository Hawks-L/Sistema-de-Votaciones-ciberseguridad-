import { z } from "zod";

const id = z.coerce.number().int().positive();

export const sedeParams = z.object({ sedeId: id });
export const facultadParams = z.object({ facultadId: id });
export const programaParams = z.object({ programaId: id });
