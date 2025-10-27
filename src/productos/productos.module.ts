import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Product } from './entities/product.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Categoria, Usuario])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
