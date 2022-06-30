import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
    email: string;

  @MinLength(8)
    password: string;
}
