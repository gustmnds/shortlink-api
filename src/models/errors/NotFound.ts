import { WebError } from './WebError';

export class NotFoundError extends WebError {
  constructor(message: string) {
    super(404, message);
  }
}
