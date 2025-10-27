import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Product> {
    const { categoria, usuarioId, ...resto } = createProductoDto as any;

    // Buscar la categoría existente (por id o nombre)
    const categoriaEntity = await this.categoriaRepository.findOne({
      where: { id: categoria }, // o { nombre: categoria } si mandás el nombre
    });

    if (!categoriaEntity) {
      throw new NotFoundException(`La categoría con id/nombre "${categoria}" no existe`);
    }

    let usuarioEntity: Usuario | undefined = undefined;
    if (usuarioId) {
      const usuarioFound = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
      if (!usuarioFound) {
        throw new NotFoundException(`Usuario con id "${usuarioId}" no existe`);
      }
      usuarioEntity = usuarioFound;
    }

    const toSave = {
      ...resto,
      categoria: categoriaEntity,
      usuario: usuarioEntity,
    } as any;

    const saved = await this.productRepository.save(toSave);
    return saved as Product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categoria', 'usuario'] });
  }

  async findOne(id: string): Promise<Product> {
    const producto = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria', 'usuario'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Product> {
    const producto = await this.findOne(id);
    const { usuarioId, ...resto } = updateProductoDto as any;

    if (usuarioId !== undefined) {
      if (usuarioId === null) {
        (producto as any).usuario = null;
        (producto as any).usuarioId = null;
      } else {
        const usuarioEntity = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuarioEntity) {
          throw new NotFoundException(`Usuario con id "${usuarioId}" no existe`);
        }
        (producto as any).usuario = usuarioEntity;
      }
    }

    const actualizado = Object.assign(producto, resto);
    return await this.productRepository.save(actualizado);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}
