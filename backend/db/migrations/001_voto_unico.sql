-- Garantiza en la base de datos que cada identificación vote una sola vez.
-- Cierra la condición de carrera entre la verificación previa y la inserción del voto.
ALTER TABLE votaciones
  ADD CONSTRAINT votaciones_votante_identificacion_key UNIQUE (votante_identificacion);
