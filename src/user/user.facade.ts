import { Inject } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/domain/entity/user';
import { IFacade } from 'src/shared/inteface/facade.interace';
import { USER_SERVICE_KEY } from './user.provider';
import { IService } from 'src/shared/inteface/service.interface';
import {
  fromUserEntityToDao,
  fromUserEntityDaoToEntity,
  fromUserEntitiesDaoToEntities,
} from 'src/shared/mapper/user/user.mapper';
import { UserDao } from 'src/database/entity';
import { BaseFilter } from 'src/domain/entity/base.filter';
import * as bcrypt from 'bcrypt';

export class UserFacade implements IFacade<User> {
  constructor(
    @Inject(USER_SERVICE_KEY)
    protected readonly userService: IService<UserDao>,
  ) {}

  create(entity: User): Observable<User> {
    const { password, ...user } = entity;
    return from(bcrypt.hash(password, 10)).pipe(
      switchMap((cryptedPassword) =>
        this.userService.create(
          fromUserEntityToDao({
            ...user,
            password: cryptedPassword,
          }),
        ),
      ),
      map((res) => fromUserEntityDaoToEntity(res)),
    );
  }

  update(id: number, entity: User): Observable<User> {
    if (id !== entity.id) {
      throw new Error('Invalid User id provided');
    }
    return this.userService
      .update(
        fromUserEntityToDao({
          ...entity,
          id: id,
        }),
      )
      .pipe(
        map((res) => {
          return fromUserEntityDaoToEntity(res);
        }),
      );
  }
  delete(ids: number[]): Observable<void> {
    return this.userService.delete(ids);
  }
  getBy(id: number, filters?: BaseFilter): Observable<User> {
    return this.userService
      .getBy(id, filters)
      .pipe(map(fromUserEntityDaoToEntity));
  }
  getAll(filters?: BaseFilter): Observable<User[]> {
    return this.userService
      .getAll(filters)
      .pipe(map(fromUserEntitiesDaoToEntities));
  }
}
