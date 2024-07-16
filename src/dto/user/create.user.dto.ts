import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MutateOrganizationDTO } from '../organization/organization.dto';
import { MutateUserDTO } from './user.dto';

export class CreateUserDTO implements Omit<MutateUserDTO, 'id'> {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  organization: MutateOrganizationDTO;
}
