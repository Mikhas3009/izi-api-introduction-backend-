import { Request, Response } from "express";
import { TaskRepository } from "../repository/task.repository"
import { TaskRequestInterface } from "../interfaces/task.interface";

export class TaskService {

    constructor(
        private taskRepository = new TaskRepository()
    ) { }

    /**
     * Метод для получения списка всех задач
     */
    public async getTasks() {
        return await this.taskRepository.getTasks()
            .catch((err) => {
                console.log(err);
                throw new Error("Не удалось получить список задач")
            })
    }

    /**
     * Метод для создания задачи
     */
    public async createTask(req: TaskRequestInterface, res: Response) {

        const task = this.taskRepository.getModelInstance(req.body.task)

        return await this.taskRepository.addTask(task)
            .catch((err) => {
                console.log(err);
                throw new Error("Не удалось добавить задачу")
            })
    }

    /**
     * Метод для изменения статуса задачи
     */
    public async setTaskStatus(req: TaskRequestInterface, res: Response) {

        const { id } = req.params
        const task = req.body.task

        const updated = (await this.taskRepository.updateTask(Number(id), task)
            .catch((err) => {
                console.log(err);
                throw new Error("Не удалось изменить статус задачи")
            })).affected
        if (!updated && updated == 0) {
            throw new Error("Неккоректный id задачи")
        }

        return updated
    }

    /**
     * Метод для удаления задачи
     */
    public async deleteTask(req: Request) {

        const { id } = req.params
        const deleted = (await this.taskRepository.deleteTask(Number(id))
            .catch((err) => {
                console.log(err);
                throw new Error("Не удалось удалить задачу задачу")
            })).affected

        if (!deleted && deleted == 0) {
            throw new Error("Неккоректный id задачи")
        }

        return deleted
    }
}