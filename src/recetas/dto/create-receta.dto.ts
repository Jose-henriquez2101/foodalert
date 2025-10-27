import { IsString, MinLength, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class IngredienteDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
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
}
