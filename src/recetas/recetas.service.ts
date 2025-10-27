import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Product } from '../productos/entities/product.entity';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Crear receta — si se pasan productoIds, los vincula
  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    const { productoIds, ...rest } = createRecetaDto as any;

    const receta = this.recetaRepository.create(rest);
    let saved = (await this.recetaRepository.save(receta) as unknown) as Receta;

    if (productoIds && productoIds.length > 0) {
      const productos = await this.productRepository.find({
        where: { id: In(productoIds) },
      });

      if (productos.length !== productoIds.length) {
        const foundIds = productos.map((p) => p.id);
        const missing = productoIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(`Productos no encontrados: ${missing.join(', ')}`);
      }

      saved.productos = productos;
      saved = await this.recetaRepository.save(saved); 
    }

    return saved; 
  }


  // Obtener todas las recetas con productos poblados
  async findAll(): Promise<Receta[]> {
    return await this.recetaRepository.find({ relations: ['productos'] });
  }

  // Obtener una receta por id con productos poblados
  async findOne(id: string): Promise<Receta> {
    const receta = await this.recetaRepository.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!receta) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    return receta;
  }

  // Actualizar: reemplaza totalmente los productos relacionados si se envía productoIds
  async update(id: string, updateRecetaDto: UpdateRecetaDto): Promise<Receta> {
    const receta = await this.findOne(id); // esto carga también productos

    const { productoIds, ...rest } = updateRecetaDto as any;
    Object.assign(receta, rest);

    // Si llega productoIds: reemplazamos la relación por completo (opción 1)
    if (productoIds) {
      if (!Array.isArray(productoIds)) {
        throw new BadRequestException('productoIds debe ser un array de UUIDs');
      }
      if (productoIds.length === 0) {
        // si envían array vacío, removemos todas las relaciones
        receta.productos = [];
        return await this.recetaRepository.save(receta);
      }

      const productos = await this.productRepository.find({
        where: { id: In(productoIds) },
      });

      if (productos.length !== productoIds.length) {
        const foundIds = productos.map((p) => p.id);
        const missing = productoIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(`Productos no encontrados: ${missing.join(', ')}`);
      }

      receta.productos = productos;
    }

    return await this.recetaRepository.save(receta);
  }

  // Eliminar receta
  async remove(id: string): Promise<void> {
    const result = await this.recetaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
  }
}
