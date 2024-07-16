import { ApiProperty } from '@nestjs/swagger';
import { MutateOrganizationDTO } from './organization.dto';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDTO
  implements Omit<MutateOrganizationDTO, 'id'>
{
  @ApiProperty()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
}
