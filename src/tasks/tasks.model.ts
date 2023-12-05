import {Column, DataType, Model, Table} from "sequelize-typescript"
interface TaskCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({tableName: "tasks"})

export class Task extends Model<Task, TaskCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  title: string
}