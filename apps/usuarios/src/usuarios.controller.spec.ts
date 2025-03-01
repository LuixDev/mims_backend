import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('UsuariosService', () => {
  let usuariosService: UsuariosService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: { 
            usuario: { 
              create: jest.fn().mockResolvedValue({
                id: 1,
                nombre: 'Juan',
                email: 'test@mail.com',
                password: 'hashedpassword',
              }),
              findUnique: jest.fn().mockResolvedValue(null), // Simula que no existe el usuario aún
            },
          },
        },
      ],
    }).compile();

    usuariosService = module.get<UsuariosService>(UsuariosService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('debería crear un usuario', async () => {
    const userData = {
      nombre: 'Juan', // Se agregó el campo requerido
      email: 'test@mail.com',
      password: '123456',
    };

    const result = await usuariosService.create(userData);

    expect(result).toHaveProperty('id');
    expect(result.nombre).toBe(userData.nombre);
    expect(result.email).toBe(userData.email);
    expect(prismaService.usuario.create).toHaveBeenCalledWith({ data: userData });
  });
});
