import { Inject, Injectable } from '@nestjs/common';
import { UserDao } from 'src/database/entity';
import { USER_REPOSITORY } from 'src/database/shared/constants/database';
import { AbstractService } from 'src/database/utils/abstract.dao';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends AbstractService<UserDao> {
  constructor(
    @Inject(USER_REPOSITORY) protected userRepository: Repository<UserDao>,
  ) {
    super(userRepository);
  }
}
