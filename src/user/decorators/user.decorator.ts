import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const User = createParamDecorator((data: any, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest()
    if (!request.user) {
        null
    }
    if (data) {
        return request.user[data]
    }
    return request.user
})