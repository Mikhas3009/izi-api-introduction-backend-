import { Request, Response } from "express";
import { TaskService } from "../../core/services/task.service";
import { TaskRequestInterface } from "../../core/interfaces/task.interface";
import { HttpStatus } from "../../core/enums/http-statuses.enum";
import { buildResponse } from "../../shared/utils/buildResponse";

export class TaskController {
    constructor(private taskService = new TaskService()) {}

    /**
     * Контроллер для получения списка всех задач
     *
     * @param req - объект запроса Express
     * @param res - объект ответа Express
     *
     * @returns Возвращает JSON-ответ с массивом задач
     * @throws 500 - если не удалось получить список задач
     */
    public async getTasks(req: Request, res: Response) {
        try {
            const tasks = await this.taskService.getTasks();
            res.status(HttpStatus.OK).json(buildResponse(true, undefined, tasks));
        } catch (err: any) {
            res.status(HttpStatus.InternalServerError).json(
                buildResponse(false, err.message || "Internal Server Error"),
            );
        }
    }

    /**
     * Контроллер для добавления новой задачи
     *
     * @param req - объект запроса, содержащий данные задачи
     * @param res - объект ответа Express
     *
     * @returns Возвращает JSON-ответ с созданной задачей
     * @throws 500 - если не удалось создать задачу
     */
    public async addTask(req: TaskRequestInterface, res: Response) {
        try {
            const task = await this.taskService.createTask(req);
            res.status(HttpStatus.Created).json(buildResponse(true, undefined, task));
        } catch (err: any) {
            res.status(HttpStatus.InternalServerError).json(
                buildResponse(false, err.message || "Internal Server Error"),
            );
        }
    }

    /**
     * Контроллер для изменения статуса задачи
     *
     * @param req - объект запроса, содержащий id задачи и новый статус
     * @param res - объект ответа Express
     *
     * @returns Возвращает JSON-ответ с количеством обновленных записей
     * @throws 500 - если не удалось изменить статус задачи
     */
    public async setTaskStasus(req: TaskRequestInterface, res: Response) {
        try {
            const updated = await this.taskService.setTaskStatus(req);
            res.status(HttpStatus.OK).json(buildResponse(true, "Статус задачи обновлен", updated));
        } catch (err: any) {
            res.status(HttpStatus.InternalServerError).json(
                buildResponse(false, err.message || "Internal Server Error"),
            );
        }
    }

    /**
     * Контроллер для удаления задачи по её ID
     *
     * @param req - объект запроса, содержащий id задачи
     * @param res - объект ответа Express
     *
     * @returns Возвращает JSON-ответ с количеством удалённых записей
     * @throws 500 - если не удалось удалить задачу
     */
    public async deleteTask(req: Request, res: Response) {
        try {
            const deleted = await this.taskService.deleteTask(req);
            res.status(HttpStatus.OK).json(buildResponse(true, "Задача удалена", deleted));
        } catch (err: any) {
            res.status(HttpStatus.InternalServerError).json(
                buildResponse(false, err.message || "Internal Server Error"),
            );
        }
    }
}
