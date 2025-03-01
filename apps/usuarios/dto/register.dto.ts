import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juanperez@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 3 caracteres)',
    example: 'abc123',
    minLength: 3,
  })
  @MinLength(3)
  password: string;
}