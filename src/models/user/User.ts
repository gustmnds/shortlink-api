import { Exclude } from 'class-transformer';

export class User {
  id: string;

  name: string;

  email: string;

  @Exclude() password: string;

  created_at: Date;

  updated_at: Date;

  constructor(data: Object) {
    Object.assign(this, data);
  }
}
