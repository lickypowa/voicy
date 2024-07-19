import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UniqueConstraintFilter } from './shared/filter/unique.constraint.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  swaggerManager(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new UniqueConstraintFilter());

  await app.listen(3000, () => {
    app
      .getUrl()
      .then((appUrl) =>
        logger.log(`@bootstrap => Start listening at ${appUrl}`),
      );
  });
}
bootstrap();

function swaggerManager(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Voicy Swagger')
    .setDescription('Voicy API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Filter out the default route
  document.paths = Object.keys(document.paths)
    .filter((path) => path !== '/')
    .reduce((obj, key) => {
      obj[key] = document.paths[key];
      return obj;
    }, {});
  SwaggerModule.setup('swagger', app, document);
}
