import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./createUserDTO";

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post("users")
    async createUser(@Body("user") createUserDTO: CreateUserDTO): Promise<any> {
        // console.log("create user ", createUserDTO);

        return await this.userService.createUser(createUserDTO)
    }

}