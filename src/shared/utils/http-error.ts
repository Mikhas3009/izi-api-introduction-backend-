import { HttpStatus } from "../../core/enums/http-statuses.enum";

export class HttpException extends Error {
    httpStatus: HttpStatus;
    constructor(message: string, httpStatus: HttpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
