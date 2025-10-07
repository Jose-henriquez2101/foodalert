import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from '../productos/entities/product.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Receta } from '../recetas/entities/receta.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  // Calcula estado de producto según fechaCaducidad (YYYYMMDD)
  private calcularEstado(fechaCaducidad: number): 'vigente' | 'proximo_a_vencer' | 'caducado' {
    const hoy = new Date();
    const anio = Math.floor(fechaCaducidad / 10000);
    const mes = Math.floor((fechaCaducidad % 10000) / 100) - 1;
    const dia = fechaCaducidad % 100;
    const caducidad = new Date(anio, mes, dia);

    const diffDias = (caducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDias < 0) return 'caducado';
    if (diffDias <= 7) return 'proximo_a_vencer';
    return 'vigente';
  }

  async executeSeed() {
    // Repositorios
    const productRepo = this.dataSource.getRepository(Product);
    const usuarioRepo = this.dataSource.getRepository(Usuario);
    const recetaRepo = this.dataSource.getRepository(Receta);

    // -------------------- PRODUCTOS --------------------
    const productos = [
      { nombre: 'Arroz', cantidad: 50, unidadMedida: 'kg', categoria: 'Cereales', fechaCaducidad: 20251201 },
      { nombre: 'Leche Entera', cantidad: 30, unidadMedida: 'litros', categoria: 'Lácteos', fechaCaducidad: 20251008 },
      { nombre: 'Pan de molde', cantidad: 20, unidadMedida: 'unidades', categoria: 'Panadería', fechaCaducidad: 20251002 },
      { nombre: 'Aceite de oliva', cantidad: 15, unidadMedida: 'litros', categoria: 'Aceites', fechaCaducidad: 20260101 },
      { nombre: 'Azúcar', cantidad: 40, unidadMedida: 'kg', categoria: 'Dulces', fechaCaducidad: 20260415 },
      { nombre: 'Huevos', cantidad: 200, unidadMedida: 'unidades', categoria: 'Proteínas', fechaCaducidad: 20251005 },
      { nombre: 'Queso', cantidad: 25, unidadMedida: 'kg', categoria: 'Lácteos', fechaCaducidad: 20251012 },
      { nombre: 'Tomate', cantidad: 100, unidadMedida: 'kg', categoria: 'Verduras', fechaCaducidad: 20251006 },
    ];

    for (const p of productos) {
      const exists = await productRepo.findOne({ where: { nombre: p.nombre } });
      if (!exists) {
        const producto = productRepo.create({
          ...p,
          id: uuidv4(),
          estado: this.calcularEstado(p.fechaCaducidad),
        });
        await productRepo.save(producto);
      }
    }

    // -------------------- USUARIOS --------------------
    const usuarios = [
      { nombre: 'Sebastián Fierro', email: 'sebastian@test.com', password: '123456' },
      { nombre: 'Ana Pérez', email: 'ana@test.com', password: '123456' },
      { nombre: 'Juan Gómez', email: 'juan@test.com', password: '123456' },
    ];

    for (const u of usuarios) {
      const exists = await usuarioRepo.findOne({ where: { email: u.email } });
      if (!exists) {
        const usuario = usuarioRepo.create(u);
        await usuarioRepo.save(usuario);
      }
    }

    // -------------------- RECETAS --------------------
    /*const recetas = [
      { nombre: 'Café Mocha', descripcion: 'Café con leche y chocolate', ingredientes: 'Café, Leche Entera, Chocolate' },
      { nombre: 'Tostada Integral', descripcion: 'Pan integral con aguacate', ingredientes: 'Pan de molde, Aguacate' },
      { nombre: 'Ensalada de Tomate', descripcion: 'Tomates frescos con aceite de oliva', ingredientes: 'Tomate, Aceite de oliva, Sal, Orégano' },
    ];

    for (const r of recetas) {
      const exists = await recetaRepo.findOne({ where: { nombre: r.nombre } });
      if (!exists) {
        const receta = recetaRepo.create(r);
        await recetaRepo.save(receta);
      }
    }*/

    console.log('Seed completo: productos, usuarios y recetas insertados correctamente');
  }
}
