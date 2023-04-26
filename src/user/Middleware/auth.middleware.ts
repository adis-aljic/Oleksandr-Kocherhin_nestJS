import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "src/config";
import { ExpressRequest } from "src/type/expressRequest.interface";
import { UserService } from "../user.service";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }

    static forRoutes(arg0: { path: string; method: import("@nestjs/common").RequestMethod; }): Function | import("@nestjs/common").Type<any> {
        throw new Error('Method not implemented.');
    }
    async use(req: ExpressRequest, _: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }

        const token = req.headers.authorization.split(" ")[1]
        try {
            const decode = verify(token, JWT_SECRET) as any

            const user = await this.userService.findById(decode.id)
            req.user = user
            next()

        } catch (error) {
            req.user = null
            next()
        }




    }

}