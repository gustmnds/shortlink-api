// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    user?: import('../../src/models/user/dto/AuthUserDTO').AuthUserDTO;
  }
}
