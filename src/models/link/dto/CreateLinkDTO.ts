import { IsUrl } from 'class-validator';

export class CreateLinkDTO {
  @IsUrl()
    link: string;
}
