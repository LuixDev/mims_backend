import { Injectable } from '@nestjs/common';

import { Client, ClientNats, Transport } from '@nestjs/microservices';
import { PrismaService } from '../../../prisma/prisma.service';

import { CambiarEstadoPedidoDto, CrearPedidoDto } from '../dto/crear-pedido.dto';

@Injectable()
export class PedidosService {
  constructor( private readonly prisma: PrismaService,
    private readonly client: ClientNats,) {}

  @Client({ transport: Transport.NATS, options: { servers: ['nats://localhost:4222'] } })


  async crearPedido(dto: CrearPedidoDto) {
    try {
      console.log('📌 Guardando pedido en la BD:', dto);
  
      // 🔍 Verificar si el usuario existe
      let usuario = await this.prisma.usuario.findUnique({
        where: { id: dto.usuarioId },
      });
  
      // 🆕 Si el usuario no existe, crearlo
      if (!usuario) {
        usuario = await this.prisma.usuario.create({
          data: {
            id: dto.usuarioId,
            nombre: 'Nuevo Usuario',
            email: `user${dto.usuarioId}@example.com`,
            password: 'password123', // ⚠ Puedes mejorar esto con hashing
          },
        });
        console.log('✅ Usuario creado:', usuario);
      }
  
      // ✅ Crear el pedido
      const pedido = await this.prisma.pedido.create({
        data: {
          usuarioId: dto.usuarioId,
          estado: dto.estado,
          productos: dto.productos,
        },
      });
  
      console.log('✅ Pedido creado:', pedido);
      return pedido;
    } catch (error) {
      console.error('❌ Error al guardar el pedido:', error.message);
      throw error;
    }
  }
  
  async listarPedidosPorUsuario(usuarioId: string) {
    console.log("Buscando pedidos para usuarioId:", usuarioId);
    
    const pedidos = await this.prisma.pedido.findMany({
      where: { usuarioId },
    });
  
    // Convertir productos en JSON legible antes de mostrarlo en la consola
    const pedidosFormateados = pedidos.map(pedido => ({
      ...pedido,
      productos: typeof pedido.productos === "string"
        ? JSON.parse(pedido.productos)
        : pedido.productos,
    }));
  
  console.log(JSON.stringify(pedidosFormateados, null, 2))
    return   pedidosFormateados;
  }
  
  


 

  async cambiarEstadoPedido(dto: CambiarEstadoPedidoDto) {
    const pedido = await this.prisma.pedido.update({
      where: { id: dto.id },
      data: { estado: dto.estado },
    });

    this.client.emit('pedido_actualizado', pedido); // Emitir evento
    return pedido;
  }
}



