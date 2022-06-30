import { IsOptional, Length } from 'class-validator';

export class Config {
  @Length(64, 64)
    JWT_SECRET: string;

  PASSWORD_SALT: string;

  @IsOptional()
    PORT: number = 4000;
}
