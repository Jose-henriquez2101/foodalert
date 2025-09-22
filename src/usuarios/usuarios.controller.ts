import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  getAllUsuarios() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  getUsuarioById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.findOneById(id);
  }

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Patch(':id')
  updateUsuario(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  deleteUsuario(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.delete(id);
  }
  
}
