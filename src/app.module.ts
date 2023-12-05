import { Module } from "@nestjs/common"

import * as process from "process"
import * as path from "path"

import {ServeStaticModule} from "@nestjs/serve-static"
import {SequelizeModule} from "@nestjs/sequelize"
import {ConfigModule} from "@nestjs/config"

import {UsersModule} from "./users/users.module"
import {TasksModule} from "./tasks/tasks.module"
import {AuthModule} from "./auth/auth.module"

import {AuthController} from "./auth/auth.controller"
import {TasksController} from "./tasks/tasks.controller"

import {User} from "./users/users.model"
import {Task} from "./tasks/tasks.model"

@Module({
  controllers: [AuthController, TasksController],
  providers: [],
  imports: [
    ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`}),
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, "static")}),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Task],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    TasksModule
  ]
})

export class AppModule {}
