import * as bcrypt from "bcryptjs"
import {HttpException, HttpStatus, Injectable} from "@nestjs/common"
import {UsersService} from "../users/users.service"
import {JwtService} from "@nestjs/jwt"
import {CreateUserDto} from "../users/dto/create.user.dto"
import {User} from "../users/users.model"

@Injectable()
export class AuthService {

    constructor(private users: UsersService, private jwt: JwtService) {}

    private async generateToken(user: User): Promise<{ token: string }> {
       const payload = {email: user.email, id: user.id}
       return { token: this.jwt.sign(payload) }
    }

    async registration(userDto: CreateUserDto): Promise<{ token: string, message: string}> {
       const candidate = await this.users.getUserByEmail(userDto.email)

       if (candidate) {
           throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST)
       }

       const hashPassword = await bcrypt.hash(userDto.password, 10)
       const user = await this.users.createUserWithDefaultRole({...userDto, password: hashPassword})
       return {...await this.generateToken(user), message: "User has been successfully created"}
    }

    async login(userDto: CreateUserDto): Promise<{ token: string }> {
        const user = await this.users.getUserByEmail(userDto.email)

        if (!user) {
            throw new HttpException("User with this email does not exist", HttpStatus.BAD_REQUEST)
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return this.generateToken(user)
        }

        throw new HttpException("Invalid email or password", HttpStatus.BAD_REQUEST)
    }
}
