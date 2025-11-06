import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserGuard } from "../guards/user-role.guard";

export function Auth(){
    return applyDecorators(
        UseGuards(AuthGuard(), UserGuard)
    )
}