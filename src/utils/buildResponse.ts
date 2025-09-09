import { BaseResponseInterface } from "../interfaces/base-response.interface";


/**
    * Функция построения ответа 
    *  @returns {BaseResponseInterface<T>} Объект с полями:
*  - `success`: boolean — статус выполнения,
*  - `message?`: string — пояснительное сообщение,
*  - `data?`: T — данные, если они есть.
    */
export function buildResponse<T>(
    success: boolean,
    message?: string,
    data?: T
): BaseResponseInterface<T> {
    return { success, message, data };
}