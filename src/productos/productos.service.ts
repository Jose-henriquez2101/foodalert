import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Product> {
    const { categoria, ...resto } = createProductoDto;

    // Buscar la categoría existente (por id o nombre)
    const categoriaEntity = await this.categoriaRepository.findOne({
      where: { id: categoria }, // o { nombre: categoria } si mandás el nombre
    });

    if (!categoriaEntity) {
      throw new NotFoundException(`La categoría con id/nombre "${categoria}" no existe`);
    }

    const producto = this.productRepository.create({
      ...resto,
      categoria: categoriaEntity,
    });

    return await this.productRepository.save(producto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: string): Promise<Product> {
    const producto = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Product> {
    const producto = await this.findOne(id);
    const actualizado = Object.assign(producto, updateProductoDto);
    return await this.productRepository.save(actualizado);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}
