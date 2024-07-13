import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import {
  ORGANIZATION_FACADE_KEY,
  ORGANIZATION_SERVICE_KEY,
  organizationProviders,
} from './organization.provider';
import { OrganizationFacade } from './organization.facade';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [
    {
      provide: ORGANIZATION_SERVICE_KEY,
      useClass: OrganizationService,
    },
    {
      provide: ORGANIZATION_FACADE_KEY,
      useClass: OrganizationFacade,
    },
    ...organizationProviders,
  ],
})
export class OrganizationModule {}
