import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { CategoriaRepository } from './categorias.repository';

@Injectable()
export class CategoriasService {
  constructor(private readonly categoriasRepository: CategoriaRepository) {}


  findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.findAll();
  }

  findOne(id: string): Promise<Categoria> {
    return this.categoriasRepository.findOneById(id);
  }

    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasRepository.create(createCategoriaDto);
  }

  update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    return this.categoriasRepository.update(id, updateCategoriaDto);
  }

  async remove(id: string): Promise<void> {
  const categoria = await this.findOne(id);

  try {
    await this.categoriasRepository.delete(id);
  } catch (error) {
    console.error('Error al eliminar categoría:', error);

    if (error.code === '23503') {
      throw new Error(
        'No se puede eliminar la categoría porque está asociada a uno o más productos.'
      );
    }

    throw new Error('Error inesperado al eliminar la categoría.');
  }
  }

}