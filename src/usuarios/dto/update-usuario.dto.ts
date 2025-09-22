import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateUsuarioDto {

    @IsUUID()
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly nombre?: string;

    @IsString()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly password?: string;
}
