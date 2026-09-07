// Thrown by both api/server.ts and api/client.ts on a non-2xx response, so
// callers can `catch (e) { if (e instanceof ApiError && e.status === 404) ... }`
// the same way regardless of which side of the app made the call.
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(status: number, message: string, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
