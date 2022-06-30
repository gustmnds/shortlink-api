import { WebError } from './WebError';

export class UnauthorizedError extends WebError {
  constructor(message: string) {
    super(401, message);
  }
}
