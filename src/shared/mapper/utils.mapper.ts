import { BaseEntity } from 'src/domain/entity/base';

export const fromDateToStringTimestamp = (
  value: number | undefined,
): string | undefined => {
  return value?.toString();
};

export const fromTimestampToDate = (
  value: number | undefined,
): Date | undefined => {
  return value ? new Date(value) : undefined;
};

export const fromDateToTimestamp = (
  value: Date | undefined,
): number | undefined => {
  return value?.getTime();
};

export const isId = <T>(entity: T | number): boolean => {
  if (entity && typeof entity === 'number') {
    return true;
  }
  return false;
};

export const isOnlyIdInterface = <T extends { id: number | string }>(
  entity: T,
): boolean => {
  const keys = Object.keys(entity);
  if (keys.length === 1 && keys[0] === 'id') {
    return true;
  }
  return false;
};

export const getEntity = <T extends { id: number }, K extends BaseEntity>(
  entity: T | number,
  callback?: (entity: T) => K,
): K | undefined => {
  if (entity === undefined || entity === null) {
    return undefined;
  }

  if (isId(entity)) {
    return {
      id: entity as number,
    } as K;
  } else if (isOnlyIdInterface(entity as T)) {
    return {
      id: (entity as T).id,
    } as K;
  } else if (callback) {
    return callback(entity as T);
  } else {
    return undefined;
  }
};

export const safeGet = <T, K>(
  arg: T | undefined,
  fun: (arg: T) => K,
): K | undefined => {
  if (arg === undefined || arg === null) {
    return undefined;
  }
  return fun(arg);
};
