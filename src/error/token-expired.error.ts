import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenExpiredException extends HttpException {
  constructor(message?: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }

  getErrorMessage(): string {
    return 'User token has expired, please login again';
  }
}
