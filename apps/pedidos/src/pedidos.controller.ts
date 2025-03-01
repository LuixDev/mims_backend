import { Controller } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CambiarEstadoPedidoDto, CrearPedidoDto } from '../dto/crear-pedido.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}


  @ApiOperation({ summary: 'Simulación de creación de pedido (usando NATS en backend)' })
  @MessagePattern('crear_pedido')
  async crearPedido(@Payload() dto: CrearPedidoDto) {
    return this.pedidosService.crearPedido(dto);
  }

  @ApiOperation({ summary: 'Listar pedidos por usuario (usando NATS en backend)' })
 @MessagePattern('listar_pedidos')
  async listarPedidos(@Payload() payload: { usuarioId: string }) {
    console.log("Buscando pedidos para usuarioId:", payload.usuarioId);
  
    const pedidos = await this.pedidosService.listarPedidosPorUsuario(payload.usuarioId);
    
    console.log("Pedidos encontrados:", pedidos);
    
    return pedidos; // Devuelve la lista de pedidos
  }


  
 @ApiOperation({ summary: 'Simulación de cambio de estado de pedido (usando NATS en backend)' })
  @MessagePattern('cambiar_estado_pedido')
  async cambiarEstadoPedido(@Payload() dto: CambiarEstadoPedidoDto) {
    return this.pedidosService.cambiarEstadoPedido(dto);
  }
  
}
