import { WebError } from './WebError';

export class BadRequestError extends WebError {
  constructor(message: string | object) {
    super(400, message);
  }
}
