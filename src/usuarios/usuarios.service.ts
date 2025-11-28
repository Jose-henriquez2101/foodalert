import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './interface/usuario.interface';
import { UsuarioRepository } from './usuario.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtPayload } from './strategies/interfaces';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuarioRepository: UsuarioRepository, 
    private readonly jwtService: JwtService
  ) {}
  
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }
  findOneById(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOneById(id);
  }
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...UserData } = createUsuarioDto;
      const usuario = await this.usuarioRepository.create({
        ...UserData,
        password: bcrypt.hashSync(password, 10),
      });

      // El repositorio ya guarda y retorna el usuario creado
      delete (usuario as any).password;
      return {
        ...usuario,
        token: this.jwtService.sign({ id: usuario.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const usuario = await this.usuarioRepository.findByEmailWithPassword(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas - email');
    }
    if (!bcrypt.compareSync(password, usuario.password)) {
      throw new UnauthorizedException('Credenciales incorrectas - password');
    }
    // ocultar password antes de retornar
    delete (usuario as any).password;
    return {
      ...usuario,
      token: this.jwtService.sign({ id: usuario.id }),
    };
  }
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  async checkAuthStatus(user: Usuario) {
    return {
      ...user,
      token: this.getJwtToken({id: user.id}),
    };
  }
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Please check server logs',
    );
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }
  delete(id: string): Promise<void> {
    return this.usuarioRepository.delete(id);
  }

}
