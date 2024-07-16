import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDTO } from './create.user.dto';

export class UpdateUserDTO extends CreateUserDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
