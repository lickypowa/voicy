import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AUTH_SERVICE_KEY } from './auth.provider';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { JWT_ACCESS_EXPIRATION, JWT_SECRET } from 'src/strategy/constant';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TokenModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_ACCESS_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE_KEY,
      useClass: AuthService,
    },
    JwtStrategy,
  ],
  exports: [AUTH_SERVICE_KEY],
})
export class AuthModule {}
