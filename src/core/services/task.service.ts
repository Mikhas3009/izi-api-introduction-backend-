import { Request } from "express";
import { TaskRepository } from "../../infrastructure/repository/task.repository";
import { TaskRequestInterface } from "../interfaces/task.interface";
import { TaskEntity } from "../entities/task.entity";

export class TaskService {
    constructor(private taskRepository = new TaskRepository()) {}

    /**
     * Получение списка всех задач
     *
     * @throws {Error}
     * Если не удалось получить список задач из базы данных
     *
     * @returns {Promise<TaskEntity[]>}
     * Массив всех задач, сохранённых в базе данных
     */
    public async getTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.getTasks().catch(() => {
            throw new Error("Не удалось получить список задач");
        });
    }

    /**
     * Метод для создания новой задачи
     * @param {TaskRequestInterface} req - Объект HTTP-запроса, содержащий задачу (`req.body.task`)
     *
     * @throws {Error} Если не удалось добавить задачу в базу данных
     *
     * @returns {Promise<TaskEntity>}
     * Возвращает созданную сущность задачи
     */
    public async createTask(req: TaskRequestInterface): Promise<TaskEntity> {
        const task = this.taskRepository.getModelInstance(req.body.task);

        return await this.taskRepository.addTask(task).catch(() => {
            throw new Error("Не удалось добавить задачу");
        });
    }

    /**
     * Метод для изменения статуса задачи
     * @param {TaskRequestInterface} req - Объект HTTP-запроса с path параметром `id` (id задачи) и обновлёнными данными задачи в `body.task`
     *
     * @throws {Error} Если не удалось обновить задачу или передан некорректный id
     *
     * @returns {Promise<number>}
     * Количество обновлённых записей (Возвращает 1 -  одна запись обновлена)
     */
    public async setTaskStatus(req: TaskRequestInterface): Promise<number> {
        const { id } = req.params;
        const task = req.body.task;

        const updated = (
            await this.taskRepository.updateTask(Number(id), task).catch(() => {
                throw new Error("Не удалось изменить статус задачи");
            })
        ).affected!;
        if (!updated && updated == 0) {
            throw new Error("Неккоректный id задачи");
        }

        return updated;
    }

    /**
     * Метод для удаления задачи
     * @param {Request} req - HTTP-запрос с paht-параметром `id` задачи
     *
     * @throws {Error} Если задача не найдена или не удалось удалить
     *
     * @returns {Promise<number>}
     * Количество удалённых записей (Возвращает 1 - одна задача удалена)
     */
    public async deleteTask(req: Request): Promise<number> {
        const { id } = req.params;
        const deleted = (
            await this.taskRepository.deleteTask(Number(id)).catch(() => {
                throw new Error("Не удалось удалить задачу задачу");
            })
        ).affected!;

        if (!deleted && deleted == 0) {
            throw new Error("Неккоректный id задачи");
        }

        return deleted;
    }
}
