import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [DatabaseModule, OrganizationModule, UserModule, AuthModule, TokenModule],
  controllers: [AppController],
  exports: [DatabaseModule],
})
export class AppModule {}
