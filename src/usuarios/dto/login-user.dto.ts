import {IsEmail, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}