import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto {
    
    @IsString()
    @IsOptional()
    readonly nombre?: string;

    @IsOptional()
    @IsString()
    readonly cantidad?: number;

    @IsOptional()
    @IsString()
    readonly unidadMedida?: string;

    @IsOptional()
    @IsString()
    readonly categoria?: string;
}
