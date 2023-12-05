import {CanActivate, ExecutionContext, UnauthorizedException, Injectable} from "@nestjs/common"
import {JwtService} from "@nestjs/jwt"
import {Observable} from "rxjs"

@Injectable()
export class JwtAuthGuard implements CanActivate {
   constructor(private jwt: JwtService) {}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      try {
        const req = context.switchToHttp().getRequest()
        const autherizationHeader = req.headers.authorization
        const bearer = autherizationHeader.split(" ")[0]
        const token = autherizationHeader.split(" ")[1]

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException({message: "User is not authorized"})
        }

        const user = this.jwt.verify(token)
        req.user = user
        return true
      } catch (e) {
          throw new UnauthorizedException({message: "User is not authorized"})
      }
   }
}