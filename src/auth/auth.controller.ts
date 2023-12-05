import {Body, Controller, Post, UsePipes} from "@nestjs/common"
import {CreateUserDto} from "../users/dto/create.user.dto"
import {AuthService} from "./auth.service"

import {ValidationPipe} from "../../pipes/validation.pipe"

@Controller("auth")
export class AuthController {

    constructor(private auth: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.auth.registration(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.auth.login(userDto)
    }
}
