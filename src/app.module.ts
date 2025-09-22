import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RecetasModule } from './recetas/recetas.module';

@Module({
  imports: [ProductosModule, UsuariosModule, RecetasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
