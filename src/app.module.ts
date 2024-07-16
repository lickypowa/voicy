import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, OrganizationModule, UserModule, AuthModule],
  controllers: [AppController],
  exports: [DatabaseModule],
})
export class AppModule {}
