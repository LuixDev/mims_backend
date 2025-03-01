import { NestFactory } from '@nestjs/core';
import { PedidosModule } from './pedidos.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(PedidosModule);

  // 🔹 Configurar el microservicio dentro de la misma instancia
  app.connectMicroservice({
    transport: Transport.NATS,
    options: { servers: ['nats://localhost:4222'] },
  });

  // Conectar y esperar que el microservicio esté disponible
  await app.startAllMicroservices(); // ⬅️ Esto asegurará que los @MessagePattern sean registrados correctamente
  console.log('✅ Microservicio de pedidos iniciado correctamente.');

  // 🔹 Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Microservicio de Pedidos con Nats')
    .setDescription('Documentación de los microservicios de pedidos y usuarios con nats')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/pedidos', app, document);

  await app.listen(3002);
  console.log('🚀 Microservicio y API corriendo en el mismo proceso');
  console.log('📘 Swagger disponible en http://localhost:3002/api/pedidos');
}

bootstrap();
