import { IsString, IsOptional, IsUUID } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    readonly nombre: string;

    @IsOptional()
    @IsUUID()
    readonly usuarioId?: string;
}
