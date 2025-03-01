import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module'; // Ajusta según `tsconfig.json`
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PrismaModule, // 👈 IMPORTA EL MÓDULO DE PRISMA
    JwtModule.register({
      secret: 'secreto_super_seguro',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, JwtStrategy], // Ya no necesitas agregar PrismaService aquí
  exports: [UsuariosService, JwtModule],
})
export class UsuariosModule {}
