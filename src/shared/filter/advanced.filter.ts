/**
 * advanced filter operat0r
 */
export enum Operator {
  EQ,
  GT,
  LT,
  GTE,
  LTE,
  LIKE,
  IN,
  NOT_EQ,
  BETWEEN,
  NOT_IN,
}

/**
 * condition interfacez. Example { 'EQ' : 'hello word'}
 *
 */
export interface Condition {
  readonly operator: Operator;
  readonly value: primitive | Date | primitiveArray;
}

export interface FindOption {
  readonly key: string;
  readonly condition: Condition;
}

export type primitive = string | number | boolean;
export type primitiveArray = number[] | string[] | Date[];
