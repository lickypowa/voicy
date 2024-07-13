import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [DatabaseModule, OrganizationModule],
  controllers: [AppController],
  exports: [DatabaseModule],
})
export class AppModule {}
