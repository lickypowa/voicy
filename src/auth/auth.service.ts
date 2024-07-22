import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, lastValueFrom, map } from 'rxjs';
import { User } from 'src/database/entity/user.entity';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { EXPIRED_TOKEN, INVALID_CREDENTIALS } from 'src/error/constant';
import { InvalidCredentialsException } from 'src/error/invalid.credentials.error';
import { JWT_REFRESH_EXPIRATION } from 'src/strategy/constant';
import { USER_SERVICE_KEY } from 'src/user/user.provider';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TOKEN_SERVICE } from 'src/token/token.provider';
import { TokenService } from 'src/token/token.service';
import { RefreshTokenDTO } from 'src/dto/token/refresh-token.dto';
import { TokenExpiredException } from 'src/error/token-expired.error';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE_KEY) protected userService: UserService,
    private jwtService: JwtService,
    @Inject(TOKEN_SERVICE)
    protected tokenService: TokenService,
  ) {}

  /**
   *
   * @param auth
   * @returns
   */
  async login({
    email,
    password,
  }: AuthDTO): Promise<{ accessToken: string; refreshToken: string }> {
    const user: User = await this.validateUser(email, password);

    const { accessToken, refreshToken } = await this.generateTokens({
      userId: user.id,
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
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await lastValueFrom(this.userService.getByEmail(email));

    if (!user) {
      throw new InvalidCredentialsException(INVALID_CREDENTIALS);
    }

    this.checkPasswordMatch(password, user.password);

    if (password !== user.password) {
      throw new InvalidCredentialsException(INVALID_CREDENTIALS);
    }

    return user;
  }

  /**
   *
   * @param loginPassword
   * @param userPassword
   */
  checkPasswordMatch(loginPassword: string, userPassword: string) {
    from(bcrypt.compare(loginPassword, userPassword)).pipe(
      map((match) => {
        if (!match) {
          throw new InvalidCredentialsException(INVALID_CREDENTIALS);
        }
      }),
    );
  }

  /**
   *
   * @param payload
   * @returns accessToken and refreshToken
   */
  async generateTokens(payload: any, oldToken?: string) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { ...payload },
      { expiresIn: JWT_REFRESH_EXPIRATION },
    );

    this.storeRefreshToken(refreshToken, payload.userId, oldToken);

    return { accessToken, refreshToken };
  }

  /**
   *
   * @param token
   * @param userId
   * @param oldToken
   */
  async storeRefreshToken(token: string, userId, oldToken?: string) {
    const expiryDate = new Date();
    expiryDate.setDate(new Date().getDate() + 3);

    if (oldToken) {
      this.tokenService.update(oldToken, { token, userId, expiryDate });
    } else {
      this.tokenService.save({ token, userId, expiryDate });
    }
  }

  /**
   *
   * @param token
   * @returns
   */
  async refreshToken({ token }: RefreshTokenDTO) {
    const foundToken = await lastValueFrom(
      this.tokenService.findOne(token).pipe(map((token) => token)),
    );

    if (!foundToken) {
      throw new TokenExpiredException(EXPIRED_TOKEN);
    }

    return this.generateTokens({ userId: foundToken.userId }, foundToken.token);
  }
}
