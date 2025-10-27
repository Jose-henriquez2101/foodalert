import { IsString, IsNumber, MinLength, Min, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(3)
  readonly nombre: string;

  @IsNumber()
  @Min(1)
  readonly cantidad: number;

  @IsString()
  readonly unidadMedida: string;

  @IsString()
  readonly categoria: string;

  @IsNumber()
  readonly fechaCaducidad: number; // si quieres que el cliente lo pase

  @IsOptional()
  @IsEnum(['vigente', 'proximo_a_vencer', 'caducado'])
  readonly estado?: 'vigente' | 'proximo_a_vencer' | 'caducado';

  // Relación con Usuario: id opcional del propietario del producto
  @IsOptional()
  @IsUUID()
  readonly usuarioId?: string;
}
