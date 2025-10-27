import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { Receta } from './entities/receta.entity';
import { Product } from 'src/productos/entities/product.entity'; // <-- IMPORTANTE
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receta, Product, Usuario]),  // ← NECESARIO PARA USAR REPOSITORIOS
  ],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
