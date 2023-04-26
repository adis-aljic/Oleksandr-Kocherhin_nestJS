import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./createUserDTO";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { sign } from "jsonwebtoken"
import { JWT_SECRET } from "src/config";
import { LoginUserDTO } from "./loginUserDTO";
import { compare } from "bcrypt";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
    ) { }


    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {

        const userByEmail = await this.userRepository.findOneBy({
            email: createUserDTO.email
        })
        const userByUsername = await this.userRepository.findOneBy({
            username: createUserDTO.username

        }
        )

        if (userByEmail || userByUsername) {
            throw new HttpException("email or username is taken", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity()

        Object.assign(newUser, createUserDTO)
        return await this.userRepository.save(newUser)
    }

    async loginUser(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            select: ["id", "username", "email", "bio", "image", "password"],
            where: { email: loginUserDTO.email }
        },
        )
        if (!user) {
            throw new HttpException("Credentials are not valid", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const isPasswordCorrect = await compare(loginUserDTO.password, user.password)
        if (!isPasswordCorrect) {
            throw new HttpException("Password is not correct", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        delete user.password;
        return user
    }


    generateJWT(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,

            }, JWT_SECRET
        )
    }

    buildUserResponse(user: UserEntity): any {
        return {
            user: {
                ...user,
                token: this.generateJWT(user)
            }
        }
    }

}