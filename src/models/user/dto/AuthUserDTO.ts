import { Expose } from 'class-transformer';

export class AuthUserDTO {
  @Expose()
    id: string;
}
