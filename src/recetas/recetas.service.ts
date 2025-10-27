import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    const receta = this.recetaRepository.create(createRecetaDto);
    return await this.recetaRepository.save(receta);
  }

  async findAll(): Promise<Receta[]> {
    return await this.recetaRepository.find();
  }

  async findOne(id: string): Promise<Receta> {
    const receta = await this.recetaRepository.findOne({ where: { id } });
    if (!receta) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    return receta;
  }

  async update(id: string, updateRecetaDto: UpdateRecetaDto): Promise<Receta> {
    const receta = await this.findOne(id);
    const actualizada = Object.assign(receta, updateRecetaDto);
    return await this.recetaRepository.save(actualizada);
  }

  async remove(id: string): Promise<void> {
    const result = await this.recetaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
  }
}
