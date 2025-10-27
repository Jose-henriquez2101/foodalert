import { IsString, MinLength, IsOptional, IsArray, ValidateNested, IsNumber, Min, IsUUID, ArrayUnique, } from 'class-validator';
import { Type } from 'class-transformer';

export class IngredienteDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0.5)
  cantidadUsada: number;

  @IsString()
  unidad: string;
}

export class CreateRecetaDto {
  @IsString()
  @MinLength(3)
  nombreReceta: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredienteDto)
  ingredientes: IngredienteDto[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  tiempoPreparacion?: number;

  // IDs opcionales para la relación ManyToMany con productos
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  productoIds?: string[];
}
