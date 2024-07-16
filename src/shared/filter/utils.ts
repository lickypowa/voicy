import { FindOneOptions } from 'typeorm';

export const filterBuilder = <T>(id: number): FindOneOptions<T> => {
  return { where: { id } } as FindOneOptions;
};
