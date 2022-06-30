import { IsUrl } from 'class-validator';

export class UpdateLinkDTO {
  @IsUrl()
    link?: string;
}
