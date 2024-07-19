import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { MutateUserDTO } from './user.dto';

export class CreateUserDTO implements Omit<MutateUserDTO, 'id'> {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message:
      'Password require at least one lowercase letter, an upper case letter, one digit and a minimum length of 6 characters',
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  organizationId: number;
}
