import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.useGlobalFilters(new PrismaExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    errorHttpStatusCode: 422
  }))

  // app.useGlobalInterceptors(new LogInterceptor())
  await app.listen(3000);
}
bootstrap();
