import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./createUserDTO";
import { UserResponseInterface } from "./type/userResponse.interface";
import { LoginUserDTO } from "./loginUserDTO";

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post("users")
    @UsePipes(new ValidationPipe())
    async createUser(@Body("user") createUserDTO: CreateUserDTO): Promise<UserResponseInterface> {

        const user = await this.userService.createUser(createUserDTO)

        return this.userService.buildUserResponse(user)
    }

    @Post("users/login")
    @UsePipes(new ValidationPipe())
    async loginUser(@Body("user") loginUserDTO: LoginUserDTO): Promise<UserResponseInterface> {
        const user = await this.userService.loginUser(loginUserDTO)
        return this.userService.buildUserResponse(user)
        // console.log("login", loginUserDTO);

        // return "Login" as any;
    }

}