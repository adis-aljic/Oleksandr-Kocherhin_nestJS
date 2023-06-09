import { CanActivate, HttpException, Injectable, HttpStatus } from "@nestjs/common"
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { ExpressRequest } from "src/type/expressRequest.interface";
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContextHost): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequest>()

        if (request.user) {
            return true;
        }
        throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED)
    }
}