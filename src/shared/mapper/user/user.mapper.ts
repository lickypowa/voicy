import { User } from 'src/domain/entity/user';
import { MutateUserDTO, UserDTO } from 'src/dto/user/user.dto';
import {
  fromOrganizationEntityDaoToEntity,
  fromOrganizationEntityToDao,
  fromOrganizationEntityToRest,
} from '../organization/organization.mapper';
import { UserDao } from 'src/database/entity';
import {
  fromDateToTimestamp,
  fromTimestampToDate,
  getEntity,
  safeGet,
} from '../utils.mapper';

export const fromUserEntityToRest = (arg?: User): UserDTO => ({
  id: arg?.id,
  name: arg?.name,
  surname: arg?.surname,
  email: arg?.email,
  password: arg?.password,
  organization: fromOrganizationEntityToRest(arg?.organization),
  createdDate: fromTimestampToDate(arg?.createdDate),
  updatedDate: fromTimestampToDate(arg?.createdDate),
});

export const fromUserEntitiesToRest = (args?: User[]): UserDTO[] => {
  return args.map(fromUserEntityToRest);
};

export const fromUserMutateRestToEntity = (arg?: MutateUserDTO): User => ({
  id: arg?.id,
  name: arg?.name,
  surname: arg?.surname,
  email: arg?.email,
  password: arg?.password,
  organization: getEntity(arg?.organizationId),
});

export const fromUserEntityToDao = (arg?: User): UserDao =>
  new UserDao()
    .set('id', arg?.id)
    .set('name', arg?.name)
    .set('surname', arg?.surname)
    .set('email', arg?.email)
    .set('password', arg?.password)
    .set(
      'organization',
      safeGet(arg?.organization, fromOrganizationEntityToDao),
    );

export const fromUserEntityDaoToEntity = (arg?: UserDao): User => ({
  id: arg?.id,
  name: arg?.name,
  surname: arg?.surname,
  email: arg?.email,
  password: arg?.password,
  organization: fromOrganizationEntityDaoToEntity(arg?.organization),
  createdDate: fromDateToTimestamp(arg?.createdAt),
  updatedDate: fromDateToTimestamp(arg?.updatedAt),
});

export const fromUserEntitiesDaoToEntities = (args?: UserDao[]): User[] => {
  return args.map(fromUserEntityDaoToEntity);
};
