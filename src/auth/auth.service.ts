import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/database/entity/user.entity';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { INVALID_CREDENTIALS } from 'src/error/constant';
import { InvalidCredentialsException } from 'src/error/invalid.credentials.error';
import { JWT_REFRESH_EXPIRATION } from 'src/strategy/constant';
import { USER_SERVICE_KEY } from 'src/user/user.provider';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE_KEY) protected userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param auth
   * @returns
   */
  async login(
    auth: AuthDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user: User = await this.validateUser(auth);

    const { accessToken, refreshToken } = await this.generateTokens({
      email: user.email,
      sub: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   *
   * @param email string
   * @param password string
   * @returns user object
   */
  async validateUser({ email, password }: AuthDTO): Promise<User> {
    const user: User = await lastValueFrom(this.userService.getByEmail(email));

    if (!user) {
      throw new InvalidCredentialsException(INVALID_CREDENTIALS);
    }

    if (password !== user.password) {
      throw new InvalidCredentialsException(INVALID_CREDENTIALS);
    }

    return user;
  }

  /**
   *
   * @param payload
   * @returns accessToken and refreshToken
   */
  async generateTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { ...payload },
      { expiresIn: JWT_REFRESH_EXPIRATION },
    );
    return { accessToken, refreshToken };
  }
}
