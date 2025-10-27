import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaRepository } from './categorias.repository';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Product } from 'src/productos/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Usuario])],
  controllers: [CategoriasController],
  providers: [CategoriasService, CategoriaRepository],
  exports: [CategoriasService, CategoriaRepository],
})
export class CategoriasModule {}
