import { BaseDTO, BaseMutateDTO } from '../base.dto';

export interface OrganizationDTO extends BaseDTO<number> {
  name: string;
  description: string;
  email: string;
}

export interface MutateOrganizationDTO extends BaseMutateDTO<number> {
  name: string;
  description: string;
  email: string;
}
