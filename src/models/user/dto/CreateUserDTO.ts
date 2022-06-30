import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  @MinLength(4)
    name: string;

  @IsEmail()
    email: string;

  @MinLength(8)
    password: string;
}
