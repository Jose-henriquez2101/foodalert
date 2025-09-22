import { IsString, Min } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @Min(3)
    readonly nombre: string;

    @IsString()
    @Min(1)
    readonly cantidad: number;

    @IsString()
    readonly unidadMedida: string;

    @IsString()
    readonly categoria: string;
}
