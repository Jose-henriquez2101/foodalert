import { IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    readonly nombre: string;
}
