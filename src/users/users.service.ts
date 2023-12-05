import { Injectable} from "@nestjs/common"
import {InjectModel} from "@nestjs/sequelize"
import {User} from "./users.model"

import {CreateUserDto} from "./dto/create.user.dto"

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private user: typeof User) {}

    async createUserWithDefaultRole(dto: CreateUserDto) {
       const user = await this.user.create(dto)
       return user
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.user.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.user.findOne({where: {email}, include: {all: true}})
        return user
    }

    async deleteUser() {

    }
}
