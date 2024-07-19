import { Inject, Injectable } from '@nestjs/common';
import { Organization } from 'src/database/entity/organization.entity';
import { ORGANIZATION_REPOSITORY } from 'src/database/shared/constants/database';
import { AbstractService } from 'src/database/utils/abstract.dao';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService extends AbstractService<Organization> {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    protected readonly repository: Repository<Organization>,
  ) {
    super(repository);
  }
}
