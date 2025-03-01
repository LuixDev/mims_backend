import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { ClientNats } from '@nestjs/microservices';

describe('PedidosService', () => {
  let service: PedidosService;
  let prisma: PrismaService;
  let clientNats: ClientNats;

  // Mock de PrismaService
  const mockPrismaService = {
    usuario: {
      findUnique: jest.fn().mockResolvedValue({ id: '123', nombre: 'Test User', email: 'test@example.com' }),
      create: jest.fn().mockResolvedValue({ id: '123', nombre: 'Test User', email: 'test@example.com' }),
    },
    pedido: {
      create: jest.fn().mockResolvedValue({ id: '1', usuarioId: '123', productos: [], estado: 'PENDIENTE' }),
      findMany: jest.fn().mockResolvedValue([{ id: '1', usuarioId: '123', productos: [], estado: 'PENDIENTE' }]),
      update: jest.fn().mockResolvedValue({ id: '1', estado: 'COMPLETADO' }),
    },
  };

  // Mock de NATS
  const mockClientNats = {
    emit: jest.fn(), // Simula eventos emitidos
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ClientNats, useValue: mockClientNats },
      ],
    }).compile();

    service = module.get<PedidosService>(PedidosService);
    prisma = module.get<PrismaService>(PrismaService);
    clientNats = module.get<ClientNats>(ClientNats);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un pedido', async () => {
    const pedido = await service.crearPedido({ usuarioId: '123', productos: [], estado: 'PENDIENTE' });
    expect(pedido).toEqual({ id: '1', usuarioId: '123', productos: [], estado: 'PENDIENTE' });
    expect(prisma.pedido.create).toHaveBeenCalledTimes(1);
  });

  it('debería listar los pedidos de un usuario', async () => {
    const pedidos = await service.listarPedidosPorUsuario('123');
  
    console.log('📌 Tipo de pedidos:', typeof pedidos);
    console.log('📌 Contenido de pedidos:', pedidos);
  
    expect(Array.isArray(pedidos)).toBe(true);
    expect(pedidos.length).toBeGreaterThan(0);
  
    if (pedidos.length > 0 && typeof pedidos[0] === 'object') {
      expect(pedidos[0]).toHaveProperty('usuarioId');
      expect(pedidos[0]?.usuarioId).toBe('123');
    } else {
      fail('📌 Error: pedidos[0] no es un objeto válido.');
    }
  });
  
  
  

  it('debería cambiar el estado de un pedido', async () => {
    const pedidoActualizado = await service.cambiarEstadoPedido({ id: '1', estado: 'COMPLETADO' });
    expect(pedidoActualizado.estado).toBe('COMPLETADO');
    expect(prisma.pedido.update).toHaveBeenCalledTimes(1);
    expect(clientNats.emit).toHaveBeenCalledWith('pedido_actualizado', expect.any(Object));
  });
});
