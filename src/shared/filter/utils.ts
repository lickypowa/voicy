import { BaseFilter } from 'src/domain/entity/base.filter';
import { FindOneOptions } from 'typeorm';

export const filterBuilder = <T>(
  entityId?: number,
  filters?: BaseFilter,
): FindOneOptions<T> => {
  const { id, relations } = filters;

  //ToDo make the porcodio filter

  return { where: { id: id ?? entityId }, relations } as FindOneOptions;
};
