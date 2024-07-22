import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TOKEN_SERVICE, tokenProviders } from './token.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
    ...tokenProviders,
  ],
  exports: [TOKEN_SERVICE],
})
export class TokenModule {}
