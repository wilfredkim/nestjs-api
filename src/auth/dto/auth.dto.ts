import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: String;
    @IsString()
    @IsNotEmpty()
    password: String

}