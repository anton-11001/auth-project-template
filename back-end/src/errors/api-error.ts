export class ApiError extends Error {
  public readonly isOperational: boolean;

  public readonly statusCode: number;

  public constructor(statusCode: number, message: string, isOperational = true) {
    super(message);

    this.isOperational = isOperational;
    this.statusCode = statusCode;
  }
}
