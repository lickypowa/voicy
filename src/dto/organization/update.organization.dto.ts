import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrganizationDTO } from './create.organization.dto';

export class UpdateOranizationDTO extends CreateOrganizationDTO {
  @IsNotEmpty()
  @IsNumber()
  id!: number;
}
