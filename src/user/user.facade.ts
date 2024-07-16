import { Inject } from '@nestjs/common';
import { map, Observable } from 'rxjs';
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

export class UserFacade implements IFacade<User> {
  constructor(
    @Inject(USER_SERVICE_KEY)
    protected readonly userService: IService<UserDao>,
  ) {}

  create(entity: User): Observable<User> {
    return this.userService.create(fromUserEntityToDao(entity)).pipe(
      map((res) => {
        return fromUserEntityDaoToEntity(res);
      }),
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
  get(id: number): Observable<User> {
    return this.userService.get(id).pipe(map(fromUserEntityDaoToEntity));
  }
  getAll(): Observable<User[]> {
    return this.userService.getAll().pipe(map(fromUserEntitiesDaoToEntities));
  }
}
