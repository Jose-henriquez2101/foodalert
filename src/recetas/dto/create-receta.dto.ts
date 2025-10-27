import { IsString, MinLength, IsOptional, IsArray, IsNumber, Min, IsUUID, ArrayUnique } from 'class-validator';

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

  // IDs opcionales para la relación ManyToMany con productos
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
