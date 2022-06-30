import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

import { JWT_SECRET } from '../configs';
import { AuthUserDTO } from '../models/user';
import { ValidatorService } from '../services/ValidatorService';
import { UnauthorizedError } from '../models/errors/Unauthorized';

/**
 * Check if user is authenticated
 *
 * ```
 * router.get('/request', authHandler(true), controller.handler) // required
 * router.get('/request', authHandler(false), controller.handler) // optional
 * ```
 * @param required authentication is required
 * @returns function to be called by router to verify if user is validated
 */
export function authHandler(required: boolean = true) {
  return function authCheck(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      if (required) {
        throw new UnauthorizedError('Missing Authentication header');
      }
      return next();
    }

    const [prefix, token] = authHeader.split(' ');

    if (prefix.toLowerCase().trim() !== 'bearer') {
      throw new UnauthorizedError('Only bearer authentication is valid');
    }

    const payload = ValidatorService.validateJWT<AuthUserDTO>(token, JWT_SECRET);
    if (!payload) {
      if (required) {
        throw new UnauthorizedError('Invalid Authentication header');
      }
      return next();
    }

    req.user = plainToInstance(AuthUserDTO, payload, { excludeExtraneousValues: true });
    return next();
  };
}
