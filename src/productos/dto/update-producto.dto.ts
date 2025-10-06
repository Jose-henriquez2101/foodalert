import { IsOptional, IsString, IsNumber, MinLength, Min, IsEnum } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly nombre?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly cantidad?: number;

  @IsOptional()
  @IsString()
  readonly unidadMedida?: string;

  @IsOptional()
  @IsString()
  readonly categoria?: string;

  @IsOptional()
  @IsNumber()
  readonly fechaCaducidad?: number;

  @IsOptional()
  @IsEnum(['vigente', 'proximo_a_vencer', 'caducado'])
  readonly estado?: 'vigente' | 'proximo_a_vencer' | 'caducado';
}
