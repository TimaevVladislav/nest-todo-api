import {HttpException, HttpStatus, Injectable} from "@nestjs/common"
import {InjectModel} from "@nestjs/sequelize"
import {Task} from "./tasks.model"
import {CreateTaskDto} from "./dto/create.task.dto"

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasks: typeof Task) {}

    async createTask(dto: CreateTaskDto): Promise<Task> {
       try {
           const task = await this.tasks.create(dto)
           return task
       } catch (e) {
           throw new HttpException("An error occurred while create the post.", HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            const tasks = await this.tasks.findAll()
            return tasks
        } catch (e) {
            throw new HttpException("An error occurred while getting the posts.", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
