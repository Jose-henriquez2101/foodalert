import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class CategoriaRepository {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepo: Repository<Categoria>
    ) {}
    async findAll(): Promise<Categoria[]> {
        const all = await this.categoriaRepo.find({ relations: ['usuario'] });
        return all.map((c) => {
            const copy = { ...c } as any;
            if (copy.usuario) delete copy.usuario;
            return copy as Categoria;
        });
    }
    async findOneById(id: string): Promise<Categoria> {
        const categoria = await this.categoriaRepo.findOne({ where: { id }, relations: ['usuario'] });
        if (!categoria) {
            throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
        }
        if ((categoria as any).usuario) delete (categoria as any).usuario;
        return categoria;
    }
    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        //TypeORM ya genera el UUID automáticamente
        const { usuarioId, ...resto } = createCategoriaDto as any;
        const newCategoria = this.categoriaRepo.create(resto as any);

        if (usuarioId) {
            // buscar usuario y asignar relación
            const usuarioRepo = (this.categoriaRepo.manager.connection as any).getRepository(Usuario) as Repository<Usuario>;
            const usuario = await usuarioRepo.findOne({ where: { id: usuarioId } });
            if (!usuario) {
                throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
            }
            (newCategoria as any).usuario = usuario;
            (newCategoria as any).usuarioId = usuarioId;
        }

    const saved = await this.categoriaRepo.save(newCategoria as any);
    if ((saved as any).usuario) delete (saved as any).usuario;
    return saved as Categoria;
    }
    async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
        const categoria = await this.findOneById(id);
        //merge datos nuevos con los anteriores
        const { usuarioId, ...resto } = updateCategoriaDto as any;
        if (usuarioId !== undefined) {
            if (usuarioId === null) {
                (categoria as any).usuario = null;
                (categoria as any).usuarioId = null;
            } else {
                const usuarioRepo = (this.categoriaRepo.manager.connection as any).getRepository(Usuario) as Repository<Usuario>;
                const usuario = await usuarioRepo.findOne({ where: { id: usuarioId } });
                if (!usuario) {
                    throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
                }
                (categoria as any).usuario = usuario;
                (categoria as any).usuarioId = usuarioId;
            }
        }

    const updatedCategoria = this.categoriaRepo.merge(categoria, resto);
    const savedUpdated = await this.categoriaRepo.save(updatedCategoria as any);
    if ((savedUpdated as any).usuario) delete (savedUpdated as any).usuario;
    return savedUpdated as Categoria;
    }
    async delete(id: string): Promise<void> {
        const categoria = await this.findOneById(id);
        await this.categoriaRepo.delete(categoria);
    }

}