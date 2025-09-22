import { IsString } from "class-validator";

export class CreateRecetaDto {

    @IsString()
    readonly nombre: string;
    
    @IsString()
    readonly descripcion: string;

    @IsString()
    readonly ingredientes: string;

}
