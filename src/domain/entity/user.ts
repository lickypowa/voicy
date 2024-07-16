import { BaseEntity } from './base';
import { Organization } from './organization';

export interface User extends BaseEntity {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly organization: Organization;
}
