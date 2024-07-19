import { Inject, Injectable } from '@nestjs/common';
import { catchError, from, Observable } from 'rxjs';
import { UserDao } from 'src/database/entity';
import { USER_REPOSITORY } from 'src/database/shared/constants/database';
import { AbstractService } from 'src/database/utils/abstract.dao';
import { EntityNotFoundError } from 'src/error/entity-not-found';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends AbstractService<UserDao> {
  constructor(
    @Inject(USER_REPOSITORY) protected userRepository: Repository<UserDao>,
  ) {
    super(userRepository);
  }

  /**
   *
   * @param email string
   * @returns UserDao
   */
  getByEmail(email: string): Observable<UserDao> {
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      catchError(() => {
        throw new EntityNotFoundError(`User not found by given email ${email}`);
      }),
    );
  }
}
