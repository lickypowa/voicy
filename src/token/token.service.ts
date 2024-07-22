import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { RefreshTokenDao } from 'src/database/entity';
import { TOKEN_REPOSITORY } from 'src/database/shared/constants/database';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    protected tokenRepository: Repository<RefreshTokenDao>,
  ) {}

  save(entity: RefreshTokenDao): Observable<RefreshTokenDao> {
    return from(this.tokenRepository.save(entity));
  }

  /**
   *
   * @param token
   * @returns
   */
  findOne(token: string): Observable<RefreshTokenDao> {
    return from(
      this.tokenRepository.findOne({
        where: { token, expiryDate: MoreThan(new Date()) },
      }),
    );
  }

  /**
   *
   * @param entity
   * @returns
   */
  update(oldToken: string, entity: RefreshTokenDao) {
    return from(this.tokenRepository.update({ token: oldToken }, entity));
  }
}
