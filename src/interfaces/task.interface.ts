import { Request } from "express";
import { TaskDto } from "../dto/task.dto";


/**
 * Базовый интерфейс запроса сущности Task.
 *
 * @property {object} body - Тело запроса
 *
 * @property {TaskDto} [body.task] - Объект задачи, передаваемый в запросе.
 */

export interface TaskRequestInterface extends Request {
    body: {
        task: TaskDto;
    };
}