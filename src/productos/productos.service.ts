import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Crear un producto nuevo
  async create(createProductoDto: CreateProductoDto): Promise<Product> {
    const producto = this.productRepository.create(createProductoDto);
    return await this.productRepository.save(producto);
  }

  // Obtener todos los productos
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Obtener un producto por su ID
  async findOne(id: string): Promise<Product> {
    const producto = await this.productRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // Actualizar un producto
  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Product> {
    const producto = await this.findOne(id); // verifica que exista
    const actualizado = Object.assign(producto, updateProductoDto);
    return await this.productRepository.save(actualizado);
  }

  // Eliminar un producto
  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}
