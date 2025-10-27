import { IsOptional, IsString, MinLength, IsArray, ValidateNested, IsNumber, Min, IsUUID, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';

export class IngredienteDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  cantidadUsada: number;

  @IsString()
  unidad: string;
}

export class UpdateRecetaDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombreReceta?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredienteDto)
  ingredientes?: IngredienteDto[];

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
}
