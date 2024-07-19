import { UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends UnauthorizedException {
  statusCode = 401;

  message = 'Invalid credentials';

  constructor(message?: string) {
    super(message);
  }

  getErrorMessage(): string {
    return 'Invalid credentials';
  }
}
