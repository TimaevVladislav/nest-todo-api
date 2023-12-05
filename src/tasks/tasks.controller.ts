import {Body, Controller, Delete, Get, Post, Put, UseGuards} from "@nestjs/common"
import {TasksService} from "./tasks.service"
import {CreateTaskDto} from "./dto/create.task.dto"
import {JwtAuthGuard} from "../../guards/auth.guard"

@Controller("tasks")
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getUserTasks() {
        return this.tasksService.getAllTasks()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createTask(@Body() dto: CreateTaskDto) {
        return this.tasksService.createTask(dto)
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    updateTask() {

    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteTask() {

    }
}
