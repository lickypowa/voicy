export class EntityNotFoundError extends Error {
  statusCode = 404;

  constructor(message: string) {
    super(message);
  }

  getErrorMessage(): string {
    return `Entity not found.`;
  }
}
