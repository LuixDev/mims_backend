import { Injectable } from '@nestjs/common';



import { RegisterDto } from '../dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../../../prisma/prisma.service';



@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RegisterDto) {
    try {
      return await this.prisma.usuario.create({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Si es un error conocido de Prisma
        if (error.code === 'P2002') {
          throw new Error('El usuario ya existe.');
        }
      }
      // Otros errores
      console.log("error")
      console.log(error)
      throw new Error('Error al crear el usuario.');
    }
  }
  async findByEmail(email: string) {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }
}
