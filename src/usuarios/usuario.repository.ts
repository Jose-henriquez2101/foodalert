import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuarioRepository {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>
    ) {}
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepo.find();
    }
    async findOneById(id: string): Promise<Usuario> {
        const usuario = await this.usuarioRepo.findOneBy({ id });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        //TypeORM ya genera el UUID automáticamente
        const newUsuario = this.usuarioRepo.create(createUsuarioDto);
        return this.usuarioRepo.save(newUsuario);
    }
    async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.findOneById(id);
        //merge datos nuevos con los anteriores
        const updatedUsuario = this.usuarioRepo.merge(usuario, updateUsuarioDto);
        return this.usuarioRepo.save(updatedUsuario);
    }
    async delete(id: string): Promise<void> {
        const result = await this.usuarioRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
    async findByEmail(email: string): Promise<Usuario | null> {
        return this.usuarioRepo.findOneBy({ email });
    }
}
