import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './services/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
bootstrap();
