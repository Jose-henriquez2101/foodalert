import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from '../productos/entities/product.entity';
import { RecetaProducto } from '../recetas/entities/receta-producto.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Receta } from '../recetas/entities/receta.entity';
import { v4 as uuidv4 } from 'uuid';
import { Categoria } from 'src/categorias/entities/categoria.entity';

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
  const recetaProductoRepo = this.dataSource.getRepository(RecetaProducto);

    
    // -------------------- USUARIOS --------------------
    const usuarios = [
      { nombre: 'Sebastián Fierro', email: 'sebastian@test.com', password: '123456' },
      { nombre: 'Ana Pérez', email: 'ana@test.com', password: '123456' },
      { nombre: 'Juan Gómez', email: 'juan@test.com', password: '123456' },
    ];

    const usuariosMap = new Map<string, Usuario>();
    for (const u of usuarios) {
      let usuario = await usuarioRepo.findOne({ where: { email: u.email } });
      if (!usuario) {
        usuario = usuarioRepo.create(u);
        usuario = await usuarioRepo.save(usuario);
      }
      usuariosMap.set(u.email, usuario);
    }

    // -------------------- CATEGORÍAS --------------------
    const nombresCategorias = ['Cereales', 'Lácteos', 'Panadería', 'Aceites', 'Dulces', 'Proteínas', 'Verduras'];

    const categoriasMap = new Map<string, Categoria>();
    const categoriaRepo = this.dataSource.getRepository(Categoria);

    // assign all categories to the first user by default
    const defaultUsuario = usuariosMap.get('sebastian@test.com');

    for (const nombre of nombresCategorias) {
      let categoria = await categoriaRepo.findOne({ where: { nombre } });
      if (!categoria) {
        categoria = categoriaRepo.create({ nombre, usuario: defaultUsuario, usuarioId: defaultUsuario?.id });
        categoria = await categoriaRepo.save(categoria as any);
      }
  categoriasMap.set(nombre, categoria!);
    }

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

    const productsMap = new Map<string, Product>();

    for (let i = 0; i < productos.length; i++) {
      const p = productos[i];
      const exists = await productRepo.findOne({ where: { nombre: p.nombre } });
      if (!exists) {
        const categoriaEntity = categoriasMap.get(p.categoria);
        // assign owners round-robin from usuarios
        const usuarioList = Array.from(usuariosMap.values());
        const owner = usuarioList.length > 0 ? usuarioList[i % usuarioList.length] : undefined;

        const producto = productRepo.create({
          id: uuidv4(),
          nombre: p.nombre,
          cantidad: p.cantidad,
          unidadMedida: p.unidadMedida,
          categoria: categoriaEntity,
          categoriaId: categoriaEntity?.id,
          usuario: owner,
          usuarioId: owner?.id,
          fechaCaducidad: p.fechaCaducidad,
          estado: this.calcularEstado(p.fechaCaducidad),
        } as any);
        const saved = await productRepo.save(producto as any);
        productsMap.set(saved.nombre, saved);
      } else {
        productsMap.set(exists.nombre, exists);
      }
    }

    // -------------------- RECETAS --------------------
    // Definir recetas con items que incluyen nombre de producto + cantidad + (opcional) unidad
    const recetas = [
      {
        nombre: 'Café Mocha',
        descripcion: 'Café con leche y chocolate',
        productoItems: [
          { name: 'Leche Entera', cantidadUsada: 0.2 },
          { name: 'Azúcar', cantidadUsada: 0.02 },
        ],
      },
      {
        nombre: 'Tostada Integral',
        descripcion: 'Pan integral con aguacate',
        productoItems: [
          { name: 'Pan de molde', cantidadUsada: 1 },
        ],
      },
      {
        nombre: 'Ensalada de Tomate',
        descripcion: 'Tomates frescos con aceite de oliva',
        productoItems: [
          { name: 'Tomate', cantidadUsada: 0.2 },
          { name: 'Aceite de oliva', cantidadUsada: 0.01 },
        ],
      },
    ];

    for (const r of recetas) {
      const exists = await recetaRepo.findOne({ where: { nombreReceta: r.nombre } });
      if (!exists) {
        // assign owner (use second user if exists)
        const owner = usuariosMap.get('ana@test.com') ?? Array.from(usuariosMap.values())[0];

        const receta = recetaRepo.create({
          nombreReceta: r.nombre,
          descripcion: r.descripcion,
          usuario: owner,
          usuarioId: owner?.id,
        } as any);

        const saved = await recetaRepo.save(receta as any);

        // create receta_producto entries using productoItems (map by product name)
        const productosRelacion = r.productoItems
          .map((it) => ({ item: it, product: productsMap.get(it.name) }))
          .filter((x) => x.product) as { item: any; product: Product }[];

        if (productosRelacion.length > 0) {
          const rpEntities = productosRelacion.map(({ item, product }) =>
            recetaProductoRepo.create({
              recetaId: saved.id,
              productId: product.id,
              cantidadUsada: item.cantidadUsada ?? 1,
              unidad: item.unidad ?? product.unidadMedida,
            } as any),
          );
          await recetaProductoRepo.save(rpEntities as any);
        }
      }
    }


    console.log('Seed completo: productos, usuarios y recetas insertados correctamente');
  }
}
