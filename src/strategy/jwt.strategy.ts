import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH_SERVICE_KEY } from 'src/auth/auth.provider';
import { AuthService } from 'src/auth/auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SERVICE_KEY) private authService: AuthService) {
    console.log('Token strategy');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
