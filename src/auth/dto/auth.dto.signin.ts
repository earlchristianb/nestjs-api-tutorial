import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDtoSignin{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}