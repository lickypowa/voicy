import { OrganizationDao } from 'src/database/entity';
import { Organization } from 'src/domain/entity/organization';
import {
  MutateOrganizationDTO,
  OrganizationDTO,
} from 'src/dto/organization/organization.dto';
import { fromDateToTimestamp, fromTimestampToDate } from '../utils.mapper';
export const fromOrganizationEntityToRest = (
  arg?: Organization,
): OrganizationDTO => ({
  id: arg?.id,
  name: arg?.name,
  description: arg?.description,
  email: arg?.email,
  createdDate: fromTimestampToDate(arg?.createdDate),
  updatedDate: fromTimestampToDate(arg?.createdDate),
});

export const fromOrganizationEntitiesToRest = (
  args?: Organization[],
): OrganizationDTO[] => {
  return args.map(fromOrganizationEntityToRest);
};

export const fromOrganizationMutateRestToEntity = (
  arg?: MutateOrganizationDTO,
): Organization => ({
  id: arg?.id,
  name: arg?.name,
  description: arg?.description,
  email: arg?.email,
});

export const fromOrganizationEntityToDao = (
  arg?: Organization,
): OrganizationDao =>
  new OrganizationDao()
    .set('id', arg?.id)
    .set('name', arg?.name)
    .set('description', arg.description)
    .set('email', arg?.email);

export const fromOrganizationEntityDaoToEntity = (
  arg?: OrganizationDao,
): Organization => ({
  id: arg?.id,
  name: arg?.name,
  description: arg?.description,
  email: arg?.email,
  createdDate: fromDateToTimestamp(arg?.createdAt),
  updatedDate: fromDateToTimestamp(arg?.updatedAt),
});

export const fromOrganizationEntitiesDaoToEntities = (
  args?: OrganizationDao[],
): Organization[] => {
  return args.map(fromOrganizationEntityDaoToEntity);
};
