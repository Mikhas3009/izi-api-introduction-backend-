import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/enums/http-statuses.enum";
import { buildResponse } from "../../shared/utils/buildResponse";

/**
 * Middlewar для преобразования тела запроса под сущность "Task"
 */
export function validateAndTransformTask(req: Request, res: Response, next: NextFunction) {
    const { title, completed } = req.body;
    const method = req.method.toUpperCase();

    // Валидация при создании (POST)
    if (method === "POST") {
        if (typeof title !== "string" || !title.trim()) {
            return res
                .status(HttpStatus.BadRequest)
                .json(buildResponse(false, "Поле title является обязательным", null));
        }
    }

    const task: Record<string, any> = {};

    // Валидация title
    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res
                .status(HttpStatus.BadRequest)
                .json(buildResponse(false, "Поле title должно быть строкой", null));
        }
        task.taskTitle = title.trim();
    }

    // Валидация completed
    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res
                .status(HttpStatus.BadRequest)
                .json(buildResponse(false, "Поле completed должно быть булевым значением", null));
        }
        task.taskIsCompleted = completed;
    }

    req.body.task = task;
    next();
}
