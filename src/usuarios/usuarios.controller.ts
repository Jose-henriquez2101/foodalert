import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req, Headers } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { RawHeaders, GetUser, Auth } from './decorators';
import type { IncomingHttpHeaders } from 'http';
import { Usuario as User } from './entities/usuario.entity';
import { ValidRoles } from './strategies/interfaces';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { LoginUserDto } from './dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usuariosService.login(loginUserDto);
  }
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.usuariosService.checkAuthStatus(user);
  }
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,) {
    return {
      ok: true,
      message: 'Hola mundo private',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
    }
  @Get('private2')
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

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
