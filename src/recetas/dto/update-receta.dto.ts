import { IsOptional, IsString, MinLength, IsArray, IsNumber, Min, IsUUID, ArrayUnique } from 'class-validator';
export class UpdateRecetaDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombreReceta?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  

  @IsOptional()
  @IsNumber()
  @Min(1)
  tiempoPreparacion?: number;

  // Reemplazar la relación de productos (opción 1)
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  productoIds?: string[];

  // Relación con Usuario (autor de la receta)
  @IsOptional()
  @IsUUID()
  usuarioId?: string;
}
