export interface EntityRefDTO<T> {
  readonly id?: T;
}

export interface BaseDTO<T extends number | string> extends EntityRefDTO<T> {
  readonly createdDate?: Date;
  readonly updatedDate?: Date;
}

export interface BaseMutateDTO<T> {
  readonly id?: T;
}
