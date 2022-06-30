import { NextFunction, Request, Response } from 'express';

import { WebError } from '../models/errors/WebError';

/**
 * Catch all errors and send to user in response
 * ```ts
 * app.use(errorHandler);
 * ```
 */
export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof WebError) {
    return response.status(err.code).json({
      error: true,
      message: err.message,
    });
  }

  return response.status(500).json({
    error: true,
    message: 'Internal Error',
  });
}
