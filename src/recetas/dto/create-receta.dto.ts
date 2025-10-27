import { IsString, MinLength, IsOptional, IsArray, IsNumber, Min, IsUUID, ArrayUnique, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoItemDto {
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidadUsada?: number;

  @IsOptional()
  @IsString()
  unidad?: string;
}

export class CreateRecetaDto {
  @IsString()
  @MinLength(3)
  nombreReceta: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  tiempoPreparacion?: number;

  // Items opcionales para la relación con productos (id + cantidad + unidad)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoItemDto)
  productoItems?: ProductoItemDto[];

  // Relación con Usuario (autor de la receta)
  @IsOptional()
  @IsUUID()
  usuarioId?: string;
}
