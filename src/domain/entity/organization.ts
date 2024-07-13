import { BaseEntity } from './base';

export interface Organization extends BaseEntity {
  readonly name: string;
  readonly description: string;
  readonly email: string;
}
