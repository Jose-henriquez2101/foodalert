import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductosRepository } from './product.repository';

@Injectable()
export class ProductosService {
  constructor(private readonly productosRepository: ProductosRepository) {}
  
  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return this.productosRepository.findAll();
  }

  findOne(id: number) {
    return this.productosRepository.findOne(id);
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.productosRepository.update(id, updateProductoDto);
  }

  remove(id: number) {
    return this.productosRepository.delete(id);
  }
}
