import { Request } from "express";
import { TaskRepository } from "../../infrastructure/repository/task.repository";
import { TaskRequestInterface } from "../interfaces/task.interface";
import { TaskEntity } from "../../infrastructure/entities/task.entity";
import { HttpException } from "../../shared/utils/http-error";
import { HttpStatus } from "../enums/http-statuses.enum";
import { CacheInterface } from "../../shared/interfaces/cashe.interface";
import { RedisCacheService } from "../../shared/services/redis-cash.service";
import { CacheKeys } from "../enums/cashe-keys.enum";

export class TaskService {
    constructor(
        private taskRepository = new TaskRepository(),
        private cacheService: CacheInterface<TaskEntity> = new RedisCacheService<TaskEntity>(),
    ) {}

    /**
     * Получение списка всех задач
     *
     * @throws {HttpException}
     * Если не удалось получить список задач из базы данных
     *
     * @returns {Promise<TaskEntity[]>}
     * Массив всех задач, сохранённых в базе данных
     */
    public async getTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.getTasks().catch(() => {
            throw new HttpException(
                "Не удалось получить список задач",
                HttpStatus.InternalServerError,
            );
        });
    }

    /**
     * Метод для создания новой задачи
     * @param {TaskRequestInterface} req - Объект HTTP-запроса, содержащий задачу (`req.body.task`)
     *
     * @throws {HttpException} Если не удалось добавить задачу в базу данных
     *
     * @returns {Promise<TaskEntity>}
     * Возвращает созданную сущность задачи
     */
    public async createTask(req: TaskRequestInterface): Promise<TaskEntity> {
        const newTask = this.taskRepository.getModelInstance(req.body.task);
        const task = await this.taskRepository.findTaskByTitle(newTask.taskTitle).catch(() => {
            throw new HttpException("Ошибка сервера", HttpStatus.InternalServerError);
        });

        if (task) {
            throw new HttpException(
                "Задача с таким заголовком уже существует",
                HttpStatus.BadRequest,
            );
        }

        this.cacheService.saveToCache(`${CacheKeys.TASKS}:${newTask.taskID}`, newTask, 60 * 60);

        return await this.taskRepository.addTask(newTask).catch(() => {
            throw new HttpException("Не удалось добавить задачу", HttpStatus.InternalServerError);
        });
    }

    /**
     * Метод для изменения статуса задачи
     * @param {TaskRequestInterface} req - Объект HTTP-запроса с path параметром `id` (id задачи) и обновлёнными данными задачи в `body.task`
     *
     * @throws {HttpException} Если не удалось обновить задачу или передан некорректный id
     *
     * @returns {Promise<number>}
     * Количество обновлённых записей (Возвращает 1 -  одна запись обновлена)
     */
    public async setTaskStatus(req: TaskRequestInterface): Promise<number> {
        const { id } = req.params;
        const task = req.body.task;

        const updated = (
            await this.taskRepository.updateTask(Number(id), task).catch(() => {
                throw new HttpException(
                    "Не удалось изменить статус задачи",
                    HttpStatus.InternalServerError,
                );
            })
        ).affected!;
        if (!updated || updated == 0) {
            throw new HttpException("Неккоректный id задачи", HttpStatus.BadRequest);
        }

        return updated;
    }

    /**
     * Метод для удаления задачи
     * @param {Request} req - HTTP-запрос с paht-параметром `id` задачи
     *
     * @throws {HttpException} Если задача не найдена или не удалось удалить
     *
     * @returns {Promise<number>}
     * Количество удалённых записей (Возвращает 1 - одна задача удалена)
     */
    public async deleteTask(req: Request): Promise<number> {
        const { id } = req.params;
        const deleted = (
            await this.taskRepository.deleteTask(Number(id)).catch(() => {
                throw new HttpException(
                    "Не удалось удалить задачу задачу",
                    HttpStatus.InternalServerError,
                );
            })
        ).affected!;

        if (!deleted || deleted == 0) {
            throw new HttpException("Неккоректный id задачи", HttpStatus.BadRequest);
        }

        this.cacheService.deleteFromCache(`${CacheKeys.TASKS}:${id}`);

        return deleted;
    }

    /**
     * Метод для получения задачи по ID
     * @param {Request} req - HTTP-запрос с paht-параметром `id` задачи
     *
     * @throws {HttpException} Если задача не найдена или не удалось найти
     *
     * @returns {Promise<TaskEntity>}
     * Объект задачи
     */
    public async getTaskByID(req: Request): Promise<TaskEntity | null> {
        const { id } = req.params;
        const task = await this.cacheService.getFromCache(`${CacheKeys.TASKS}:${id}`);

        if (task) {
            return task;
        }

        const foundedTask = await this.taskRepository.findTaskByID(Number(id)).catch(() => {
            throw new HttpException(
                `Не удалось получить задачу с ID:${id}`,
                HttpStatus.InternalServerError,
            );
        });

        if (!foundedTask) {
            throw new HttpException(`Задачи с ID:${id} не существует`, HttpStatus.BadRequest);
        }

        this.cacheService.saveToCache(`${CacheKeys.TASKS}:${foundedTask.taskID}`, foundedTask);

        return foundedTask;
    }
}
