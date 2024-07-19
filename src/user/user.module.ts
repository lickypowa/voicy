import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import {
  USER_FACADE_KEY,
  USER_SERVICE_KEY,
  userProviders,
} from './user.provider';
import { UserFacade } from './user.facade';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AUTH_SERVICE_KEY } from 'src/auth/auth.provider';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, PassportModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_FACADE_KEY,
      useClass: UserFacade,
    },
    {
      provide: USER_SERVICE_KEY,
      useClass: UserService,
    },
    { provide: AUTH_SERVICE_KEY, useClass: AuthService },
    ...userProviders,
    JwtStrategy,
    JwtService,
  ],
  exports: [USER_SERVICE_KEY],
})
export class UserModule {}
