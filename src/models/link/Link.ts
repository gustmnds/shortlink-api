import { Transform } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { TransformService } from '../../services/TrasformService';

import { User } from '../user';

export class Link {
  @Transform((param) => TransformService.NumberToBase64(param.value), { toPlainOnly: true })
    id: number | string;

  @IsUrl()
    link: string;

  users_id?: string;

  access_count: number;

  created_at: Date;

  updated_at: Date;

  user: User;

  constructor(data: Object) {
    Object.assign(this, data);
  }
}
