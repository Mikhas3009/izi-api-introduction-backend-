// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/enums/http-statuses.enum";
import { HttpException } from "../../shared/utils/http-error";
import { buildResponse } from "../../shared/utils/buildResponse";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpException) {
        console.log(err);
        return res.status(err.httpStatus).json(buildResponse(false, err.message, null));
    }

    if (err instanceof Error) {
        console.log(err);
        return res
            .status(HttpStatus.InternalServerError)
            .json(buildResponse(false, err.message, null));
    }

    return res
        .status(HttpStatus.InternalServerError)
        .json(buildResponse(false, "Internal server error", null));
}
