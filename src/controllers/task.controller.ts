import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { TaskRequestInterface } from "../interfaces/task.interface";
import { HttpStatus } from "../enums/http-statuses.enum";
import { buildResponse } from "../utils/buildResponse";


export class TaskController {

    constructor(
        private taskService = new TaskService
    ) { }

    //получение списка задач
    public async getTasks(req: Request, res: Response) {
        try {
            const tasks = await this.taskService.getTasks();
            res.status(HttpStatus.OK).json(buildResponse(true, undefined, tasks));
        }
        catch (err: any) {
            res.status(HttpStatus.InternalServerError)
                .json(buildResponse(false, err.message || "Internal Server Error"));
        }

    }

    //добавление задачи
    public async addTask(req: TaskRequestInterface, res: Response) {
        try {
            const task = await this.taskService.createTask(req, res);
            res.status(HttpStatus.Created).json(buildResponse(true, undefined, task));
        }
        catch (err: any) {
            res.status(HttpStatus.InternalServerError)
                .json(buildResponse(false, err.message || "Internal Server Error"));
        }
    }

    //изменение статуса задачи
    public async setTaskStasus(req: TaskRequestInterface, res: Response) {
        try {
            const updated = await this.taskService.setTaskStatus(req, res)
            res.status(HttpStatus.OK).json(buildResponse(true, "Статус задачи обновлен", updated));
        }
        catch (err: any) {
            res.status(HttpStatus.InternalServerError)
                .json(buildResponse(false, err.message || "Internal Server Error"));
        }

    }

    //удаление задачи по ID
    public async deleteTask(req: Request, res: Response) {
        try {
            const deleted = await this.taskService.deleteTask(req)
            res.status(HttpStatus.OK).json(buildResponse(true, "Задача удалена", deleted));
        }
        catch (err: any) {
            res.status(HttpStatus.InternalServerError)
                .json(buildResponse(false, err.message || "Internal Server Error"));
        }
    }
}