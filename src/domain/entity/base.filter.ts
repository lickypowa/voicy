import { FindOption } from 'src/shared/filter/advanced.filter';

export interface BaseFilter {
  readonly id?: number;
  readonly relations?: string[];
  readonly queryOptions?: FindOption[];
}
