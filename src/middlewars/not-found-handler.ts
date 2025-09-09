import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../enums/http-statuses.enum";


/**
     * Middlewar для обработки 404 ошибки роутинга
*/
export function handleNotFound(req: Request, res: Response, next: NextFunction) {
    res.status(HttpStatus.NotFound).json({
        error: "Адрес не найден",
        path: req.originalUrl,
    });
}