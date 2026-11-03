// Error controlado: su mensaje es seguro para mostrarlo al cliente.
export class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
