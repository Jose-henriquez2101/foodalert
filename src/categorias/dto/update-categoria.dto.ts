import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCategoriaDto {

    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly nombre?: string;

    @IsOptional()
    @IsUUID()
    readonly usuarioId?: string;

}
