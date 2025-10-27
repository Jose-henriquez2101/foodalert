import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";

@Injectable()
export class CategoriaRepository {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepo: Repository<Categoria>
    ) {}
    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepo.find();
    }
    async findOneById(id: string): Promise<Categoria> {
        const categoria = await this.categoriaRepo.findOneBy({ id });
        if (!categoria) {
            throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
        }
        return categoria;
    }
    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        //TypeORM ya genera el UUID automáticamente
        const newCategoria = this.categoriaRepo.create(createCategoriaDto);
        return this.categoriaRepo.save(newCategoria);
    }
    async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
        const categoria = await this.findOneById(id);
        //merge datos nuevos con los anteriores
        const updatedCategoria = this.categoriaRepo.merge(categoria, updateCategoriaDto);
        return this.categoriaRepo.save(updatedCategoria);
    }
    async delete(id: string): Promise<void> {
        const categoria = await this.findOneById(id);
        await this.categoriaRepo.delete(categoria);
    }

}