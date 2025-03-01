import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Configurar comunicación con NATS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'], // Ajusta según tu configuración
    },
  });

  // 🔹 Iniciar microservicios NATS
  await app.startAllMicroservices();

  // 🔹 Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gestión de Usuarios y Pedidos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('API Gateway corriendo en http://localhost:3000/api');
}

bootstrap();
