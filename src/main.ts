import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Food')
  .setDescription('The Food API description')
  .setVersion('1.0')
  .addServer("http://localhost:3003")
  .addSecurity("scheme security",{
    type:'http',
    name: 'scheme',
    in: 'header',
    scheme: 'Bearer',
    bearerFormat: 'jwt',
  })
  .addSecurityRequirements("scheme security")
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
  const corsOptions: CorsOptions = {
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Language',
      'X-Timezone',
      'X-Timezone-Name',
    ],
    origin:"*",
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  };
  app.enableCors(corsOptions);
  await app.listen(3003);
}
bootstrap();
