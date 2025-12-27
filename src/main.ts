import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registrar el filter global
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configurar ValidationPipe para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no permitidas
      forbidNonWhitelisted: true, // error si envían campos extra
      transform: true, // transforma tipos
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Failed to start application', error);
  process.exit(1);
});
