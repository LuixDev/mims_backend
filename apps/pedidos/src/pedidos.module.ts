import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@prisma/prisma.module';
import { PrismaService } from '@prisma/prisma.service';


@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'NATS_SERVICE', // 📌 Este nombre debe coincidir con el Inject en PedidosService
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  providers: [PedidosService,PrismaService], 
  controllers: [PedidosController],
  exports: [PedidosService,],
})
export class PedidosModule {}
