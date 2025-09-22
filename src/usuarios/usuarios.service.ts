import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {v4 as uuid} from 'uuid';
import { Usuario } from './interface/usuario.interface';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}
  
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }
  findOneById(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOneById(id);
  }
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioRepository.create(createUsuarioDto);
  }
  update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }
  delete(id: string): Promise<void> {
    return this.usuarioRepository.delete(id);
  }
}
