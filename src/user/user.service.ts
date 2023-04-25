import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./createUserDTO";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
    ) { }


    async createUser(createUserDTO: CreateUserDTO) {
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDTO)
        return await this.userRepository.save(newUser)
    }

}