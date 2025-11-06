import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user as User;

        if (!user)
            throw new BadRequestException('User not found');
        return true
    }
}