import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RecetasModule } from './recetas/recetas.module';

@Module({
  imports: [ProductosModule, UsuariosModule, RecetasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
