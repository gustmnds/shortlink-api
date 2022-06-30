import { Transform } from 'class-transformer';
import { Min, Max } from 'class-validator';

export class ListQueryDTO {
  @Min(1)
  @Transform((param) => parseInt(param.value, 10))
    page: number = 1;

  @Min(1)
  @Max(50)
  @Transform((param) => parseInt(param.value, 10))
    count: number = 20;
}
