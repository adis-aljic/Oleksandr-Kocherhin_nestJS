import { IsEmail, IsNotEmpty } from "class-validator"
export class LoginUserDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    readonly password: string

}