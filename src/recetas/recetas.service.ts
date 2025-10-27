import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Product } from '../productos/entities/product.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear receta — si se pasan productoIds, los vincula
  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    const { productoIds, usuarioId, ...rest } = createRecetaDto as any;

    // si se pasa usuarioId, verificar existencia y asignar
    let usuarioEntity: Usuario | undefined = undefined;
    if (usuarioId) {
      const usuarioFound = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
      if (!usuarioFound) {
        throw new NotFoundException(`Usuario con id "${usuarioId}" no existe`);
      }
      usuarioEntity = usuarioFound;
    }

    const receta = this.recetaRepository.create({ ...rest, usuario: usuarioEntity });
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

    if ((saved as any).usuario) delete (saved as any).usuario;
    return saved;
  }


  // Obtener todas las recetas con productos poblados
  async findAll(): Promise<Receta[]> {
    const all = await this.recetaRepository.find({ relations: ['productos', 'usuario'] });
    return all.map((r) => {
      const copy = { ...r } as any;
      if (copy.usuario) delete copy.usuario;
      return copy as Receta;
    });
  }

  // Obtener una receta por id con productos poblados
  async findOne(id: string): Promise<Receta> {
    const receta = await this.recetaRepository.findOne({
      where: { id },
      relations: ['productos', 'usuario'],
    });
    if (!receta) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    if ((receta as any).usuario) delete (receta as any).usuario;
    return receta;
  }

  // Actualizar: reemplaza totalmente los productos relacionados si se envía productoIds
  async update(id: string, updateRecetaDto: UpdateRecetaDto): Promise<Receta> {
    const receta = await this.findOne(id); // esto carga también productos

  const { productoIds, usuarioId, ...rest } = updateRecetaDto as any;
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

    // manejar cambio de propietario (usuario)
    if (usuarioId !== undefined) {
      if (usuarioId === null) {
        (receta as any).usuario = null;
        (receta as any).usuarioId = null;
      } else {
        const usuarioFound = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuarioFound) {
          throw new NotFoundException(`Usuario con id "${usuarioId}" no existe`);
        }
        (receta as any).usuario = usuarioFound;
      }
    }

    const updated = await this.recetaRepository.save(receta);
    if ((updated as any).usuario) delete (updated as any).usuario;
    return updated;
  }

  // Eliminar receta
  async remove(id: string): Promise<void> {
    const result = await this.recetaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
  }
}
