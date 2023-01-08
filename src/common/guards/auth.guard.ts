import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/modules/user/user.service";
import { SYSTEM } from "../constants";
import { verifyToken } from "../utils";

@Injectable()
export class AuthGuards implements CanActivate {
    constructor(
        private userService: UserService,
        private readonly reflector: Reflector,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isPublic = this.reflector.get<string[]>(
            SYSTEM.PUBLIC,
            context.getHandler(),
        );
        if (isPublic){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        // console.log(1111111111111, request);
        
        const { authorization } = request.headers;
        if(!authorization){
            return false;
        }

        const decoded = verifyToken(authorization, SYSTEM.SECRET);
        if(!decoded){
            return false;
        }

        const userFromDb = await this.userService.getUserByUserNameOrEmail({
            userName: decoded.userName,
        });

        if(!userFromDb) {
            return false;
        }
        request.user = userFromDb
        return true;
        
    }
}