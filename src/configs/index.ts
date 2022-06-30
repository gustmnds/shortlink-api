import { plainToInstance } from 'class-transformer';

import { Config } from '../models/configs/config';
import { ValidatorService } from '../services/ValidatorService';

const Configs = plainToInstance(Config, process.env);

export async function checkConfig() {
  try {
    await ValidatorService.validateObject(Configs);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

export const {
  JWT_SECRET,
  PASSWORD_SALT,
  PORT,
} = Configs;
