import { OrganizationDao } from 'src/database/entity';
import { Organization } from 'src/domain/entity/organization';
import {
  MutateCustomerDTO,
  OrganizationDTO,
} from 'src/dto/organization/organization.dto';
import { fromDateToTimestamp, fromTimestampToDate } from '../utils.mapper';
export const fromEntityToRest = (arg?: Organization): OrganizationDTO => ({
  id: arg?.id,
  name: arg?.name,
  description: arg?.description,
  email: arg?.email,
  createdDate: fromTimestampToDate(arg?.createdDate),
  updatedDate: fromTimestampToDate(arg?.createdDate),
});

export const fromEntitiesToRest = (
  args?: Organization[],
): OrganizationDTO[] => {
  return args.map(fromEntityToRest);
};

export const fromMutateRestToEntity = (
  arg?: MutateCustomerDTO,
): Organization => ({
  id: arg?.id,
  name: arg?.name,
  description: arg?.description,
  email: arg?.email,
  createdDate: undefined,
  updatedDate: undefined,
});

export const fromEntityToDao = (arg?: Organization): OrganizationDao =>
  new OrganizationDao()
    .set('id', arg?.id)
    .set('name', arg?.name)
    .set('description', arg.description)
    .set('email', arg?.email);

export const fromEntityDaoToEntity = (arg?: OrganizationDao): Organization => ({
  id: arg?.id,
  name: arg?.name,
  description: arg?.description,
  email: arg?.email,
  createdDate: fromDateToTimestamp(arg?.createdAt),
  updatedDate: fromDateToTimestamp(arg?.updatedAt),
});

export const fromEntitiesDaoToEntities = (
  args?: OrganizationDao[],
): Organization[] => {
  return args.map(fromEntityDaoToEntity);
};
