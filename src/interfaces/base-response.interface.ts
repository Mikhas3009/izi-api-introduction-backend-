/**
 * Базовый интерфейс для стандартизированных ответов API.
 *
 * @template T - Тип данных, которые могут возвращаться в поле `data`.
 *
 * @property {boolean} success - Статус выполнения операции:
 *
 * @property {string} [message] - Дополнительное сообщение для клиента (текст ошибки).
 *   
 * @property {T} [data] - Полезная нагрузка (тело ответа).
 */

export interface BaseResponseInterface<T = any> {
    success: boolean
    message?: string
    data?: T;
}