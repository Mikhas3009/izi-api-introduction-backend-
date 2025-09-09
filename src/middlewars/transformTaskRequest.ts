import { Request, Response, NextFunction } from "express";


/**
     * Middlewar для преобразования тела запроса под сущность "Task"
*/
export function validateAndTransformTask(req: Request, res: Response, next: NextFunction) {
    
    const { title, completed } = req.body;
    const method = req.method.toUpperCase();

    if (method === "POST") {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ error: "Поле title является обязательным" });
        }
    }


    const task: Record<string, any> = {};

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ error: "Поле title должно быть строкой" });
        }
        task.taskTitle = title.trim();
    }

    if (completed !== undefined) {
        task.taskIsCompleted = completed;
    }

    req.body.task = task;
    next();
}