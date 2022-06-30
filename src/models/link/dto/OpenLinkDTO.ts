import { Transform } from 'class-transformer';
import { TransformService } from '../../../services/TrasformService';

export class OpenLinkDTO {
  @Transform((param) => TransformService.Base64ToNumber(param.value), { toClassOnly: true })
    linkId: number;
}
