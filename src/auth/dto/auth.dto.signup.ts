import { IsEmail, IsNotEmpty, IsString, isValidationOptions, ValidationSchema } from "class-validator"

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;


    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    lastName: string;
    
}