import { TaskEntity } from "../entities/task.entity";
import { BaseRepository } from "./base.repository";

export class TaskRepository extends BaseRepository<TaskEntity> {

    constructor() {
        super(TaskEntity)
    }

    public async getTasks() {
        return await this.repository.find()
            .catch(err => {
                throw err;
            })
    }

    public async addTask(task: Partial<TaskEntity>) {
        return await this.repository.save(task)
            .catch((err) => {
                throw err;
            })
    }

    public async updateTask(id: number, task: Partial<TaskEntity>) {
        return await this.repository.update(id, task)
            .catch((err) => {
                throw err;
            })
    }

    public async deleteTask(id: number) {
        return await this.repository.delete(id)
            .catch((err) => {
                throw err;
            })
    }
}