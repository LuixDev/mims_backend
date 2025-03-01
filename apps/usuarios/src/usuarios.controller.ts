import { Controller } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService
  ) {}

  @MessagePattern('registro')
  async register(@Payload() data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.usuariosService.create({ ...data, password: hashedPassword });
  }

  @MessagePattern('login')
  async login(@Payload() data: { email: string; password: string }) {
    const usuario = await this.usuariosService.findByEmail(data.email);
    
    if (!usuario) {
      return { message: 'Usuario no encontrado' };
    }
  
    const passwordValid = await bcrypt.compare(data.password, usuario.password);
    if (!passwordValid) {
      return { message: 'Credenciales incorrectas' };
    }
  
    // Generar el token JWT
    const token = this.jwtService.sign({ email: usuario.email, nombre: usuario.nombre });
    console.log('Token generado:', token); 
    return { access_token: token };
  }

  @MessagePattern('perfil')
  async perfil(@Payload() data: { token: string }) {
    try {
      const decoded = this.jwtService.verify(data.token); // Verifica el token
      return { email: decoded.email, nombre: decoded.nombre };
    } catch (error) {
      return { message: 'Token inválido o expirado' };
    }
  }
}
