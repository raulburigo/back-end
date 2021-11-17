import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

function startSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API MERCA')
    .setDescription('Contacts API MercaFácil')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  startSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors();
  await app.listen(app.get(ConfigService).get('app.port'), '0.0.0.0');
}
bootstrap();
