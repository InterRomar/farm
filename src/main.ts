import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rabbit Farm NestJS API')
    .setDescription('Rabbit Farm NestJS API description')
    .setVersion('1.0.0')
    .addTag('test')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT);

  console.log('NODE_ENV = ' + process.env.NODE_ENV);
  console.log('Server listening on port ' + process.env.PORT);
}

bootstrap();
