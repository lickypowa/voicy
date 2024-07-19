import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_API } from 'src/shared/constants';
import { AUTH_SERVICE_KEY } from './auth.provider';
import { AuthDTO } from 'src/dto/auth/auth.dto';

@Controller(AUTH_API)
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_KEY) protected readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() auth: AuthDTO) {
    return this.authService.login(auth);
  }
}
