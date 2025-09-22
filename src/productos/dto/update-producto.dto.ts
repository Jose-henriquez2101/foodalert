import { IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateProductoDto {
    @IsUUID()
    @IsOptional()
    @IsString()
    readonly id?: string;
    
    @IsOptional()
    @IsString()
    readonly nombre?: string;

    @IsOptional()
    @IsString()
    readonly descripcion?: string;

    @IsOptional()
    @IsString()
    readonly ingredientes?: string;

}