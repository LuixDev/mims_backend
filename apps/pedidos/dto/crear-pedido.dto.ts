import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsEnum } from 'class-validator';

export class CrearPedidoDto {
  @ApiProperty({ example: '123456', description: 'ID del usuario que realiza el pedido' })
  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @ApiProperty({ example: [{ productoId: 'abc123', cantidad: 2 }], description: 'Lista de productos' })
  @IsArray()
  @IsNotEmpty()
  productos: any[];

  @ApiProperty({ example: 'PENDIENTE', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], description: 'Estado del pedido' })
  @IsEnum(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO';
}

export class CambiarEstadoPedidoDto {
  @ApiProperty({ example: '654321', description: 'ID del pedido a actualizar' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'EN_PROCESO', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'], description: 'Nuevo estado del pedido' })
  @IsEnum(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
  estado: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO';
}
