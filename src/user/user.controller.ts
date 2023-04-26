import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./createUserDTO";
import { UserResponseInterface } from "./type/userResponse.interface";
import { LoginUserDTO } from "./loginUserDTO";
import { ExpressRequest } from "src/type/expressRequest.interface";
import { User } from "./decorators/user.decorator";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDTO } from "./updateUserDTO";

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

    }

    @Get("user")
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
        console.log(user, " user");

        return this.userService.buildUserResponse(user)
    }

    @Put("user")
    @UseGuards(AuthGuard)
    async updateCurrentUser(@User("id") currentUserID: number, @Body("user") updateUserDTO: UpdateUserDTO): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(currentUserID, updateUserDTO)
        return this.userService.buildUserResponse(user)
    }


}