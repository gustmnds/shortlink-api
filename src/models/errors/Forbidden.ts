import { WebError } from './WebError';

export class ForbiddenError extends WebError {
  constructor(message: string) {
    super(403, message);
  }
}
