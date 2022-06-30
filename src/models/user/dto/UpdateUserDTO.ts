import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @MinLength(4)
    name?: string;

  @IsOptional()
  @IsEmail()
    email?: string;

  @IsOptional()
  @MinLength(8)
    password?: string;
}
