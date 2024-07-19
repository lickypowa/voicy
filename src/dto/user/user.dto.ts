import { BaseDTO, BaseMutateDTO } from '../base.dto';
import { OrganizationDTO } from '../organization/organization.dto';

export interface UserDTO extends BaseDTO<number> {
  name: string;
  surname: string;
  email: string;
  password: string;
  organization: OrganizationDTO;
}

export interface MutateUserDTO extends BaseMutateDTO<number> {
  name: string;
  surname: string;
  email: string;
  password: string;
  organizationId: number;
}
