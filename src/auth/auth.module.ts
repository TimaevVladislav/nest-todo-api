import * as process from "process"
import {forwardRef, Module} from "@nestjs/common"
import { AuthService } from "./auth.service"
import {UsersModule} from "../users/users.module"
import {JwtModule} from "@nestjs/jwt"

@Module({
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
      JwtModule.register({
          secret: process.env.API_SECRET_KEY || "SECRET",
          signOptions: {expiresIn: "24h"}
      }),
  ],
  exports: [
      AuthService,
      JwtModule
  ]
})

export class AuthModule {}
