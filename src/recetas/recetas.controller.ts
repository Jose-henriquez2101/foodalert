import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../usuarios/guards/user-role.guard';
import { UseGuards } from '@nestjs/common';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @UseGuards(AuthGuard(), UserRoleGuard)
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetasService.create(createRecetaDto);
  }

  @Get()
  findAll() {
    return this.recetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetasService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetasService.update(id, updateRecetaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.recetasService.remove(id);
  }
}
