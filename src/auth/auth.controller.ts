import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_API } from 'src/shared/constants';
import { AUTH_SERVICE_KEY } from './auth.provider';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { UniqueConstraintFilter } from 'src/shared/filter/unique.constraint.filter';
import { RefreshTokenDTO } from 'src/dto/token/refresh-token.dto';

@Controller(AUTH_API)
@UseFilters(UniqueConstraintFilter)
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_KEY) protected readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() auth: AuthDTO) {
    return this.authService.login(auth);
  }

  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDTO) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
