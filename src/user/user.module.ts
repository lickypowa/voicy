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

@Module({
  imports: [DatabaseModule],
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
    ...userProviders,
  ],
})
export class UserModule {}
