import {Controller, Post, Get, Body, UsePipes, Delete} from "@nestjs/common"
import {UsersService} from "./users.service"

import {ValidationPipe} from "../../pipes/validation.pipe"
import {CreateUserDto} from "./dto/create.user.dto"

@Controller("users")

export class UsersController {

    constructor(private usersService: UsersService) {}

    @UsePipes(ValidationPipe)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
      return this.usersService.createUserWithDefaultRole(userDto)
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }

    @Delete()
    deleteUser() {
        return this.usersService.deleteUser()
    }
}
