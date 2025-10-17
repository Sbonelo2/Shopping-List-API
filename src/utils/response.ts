import { ServerResponse } from "http";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const sendSuccess = <T>(
  res: ServerResponse,
  data: T,
  statusCode: number = 200
): void => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  const response: ApiResponse<T> = {
    success: true,
    data,
  };
  res.end(JSON.stringify(response));
};

export const sendError = (
  res: ServerResponse,
  error: string,
  statusCode: number = 400
): void => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  const response: ApiResponse = {
    success: false,
    error,
  };
  res.end(JSON.stringify(response));
};

export const sendMessage = (
  res: ServerResponse,
  message: string,
  statusCode: number = 200
): void => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  const response: ApiResponse = {
    success: true,
    message,
  };
  res.end(JSON.stringify(response));
};

// Common error handlers
export const handleBadRequest = (res: ServerResponse, message: string): void => {
  sendError(res, message, 400);
};

export const handleNotFound = (res: ServerResponse, message: string = "Resource not found"): void => {
  sendError(res, message, 404);
};

export const handleMethodNotAllowed = (res: ServerResponse, message: string = "Method not allowed"): void => {
  sendError(res, message, 405);
};

export const handleInvalidJson = (res: ServerResponse): void => {
  sendError(res, "Invalid JSON payload", 400);
};
