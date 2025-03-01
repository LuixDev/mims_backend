import { NestFactory } from '@nestjs/core';
import { UsuariosModule } from './usuarios.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsuariosModule);

  // 🔹 Configurar Microservicio NATS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'], // Cambia esto si usas otro host
    },
  });

  // 🔹 Iniciar microservicio NATS
  await app.startAllMicroservices();

  // 🔹 Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Nats de Usuarios')
    .setDescription('Gestión de usuarios y autenticación')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/usuarios', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Usuarios API corriendo en http://localhost:${process.env.PORT ?? 3001}/api/usuarios`);
}

bootstrap();
