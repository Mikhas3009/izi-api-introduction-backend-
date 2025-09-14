import { TaskEntity } from "../entities/task.entity";
import { BaseRepository } from "./base.repository";

/**
 * Репозиторий для работы с сущностью TaskEntity
 *
 * Класс инкапсулирует доступ к базе данных через TypeORM Repository
 * и предоставляет методы для выполнения CRUD-операций над задачами.
 */
export class TaskRepository extends BaseRepository<TaskEntity> {
    constructor() {
        super(TaskEntity);
    }

    /**
     * Получение всех задач из базы данных
     *
     * @returns Массив сущностей TaskEntity
     * @throws Ошибка базы данных при неудачном запросе
     */
    public async getTasks() {
        return await this.repository.find().catch((err) => {
            throw err;
        });
    }
    /**
     * Добавление новой задачи в базу данных
     *
     * @param task - объект с полями новой задачи
     * @returns Сохранённая сущность TaskEntity
     * @throws Ошибка базы данных при неудачной вставке
     */

    public async addTask(task: Partial<TaskEntity>) {
        return await this.repository.save(task).catch((err) => {
            throw err;
        });
    }
    /**
     * Обновление существующей задачи по её ID
     *
     * @param id - идентификатор задачи
     * @param task - объект с обновлёнными полями задачи
     * @returns Результат выполнения update (UpdateResult)
     * @throws Ошибка базы данных при неудачном обновлении
     */
    public async updateTask(id: number, task: Partial<TaskEntity>) {
        return await this.repository.update(id, task).catch((err) => {
            throw err;
        });
    }
    /**
     * Удаление задачи по её ID
     *
     * @param id - идентификатор задачи
     * @returns Результат выполнения delete (DeleteResult)
     * @throws Ошибка базы данных при неудачном удалении
     */
    public async deleteTask(id: number) {
        return await this.repository.delete(id).catch((err) => {
            throw err;
        });
    }

    /**
     * Поиск задачи по заголовку
     *
     * @param taskTitle - заголовок задачи
     * @returns Одна конкретная запись задачи
     * @throws Ошибка базы данных при неудачном исходе
     */
    public async findTaskByTitle(taskTitle: string): Promise<TaskEntity | null> {
        return await this.repository.findOne({ where: { taskTitle } }).catch((err) => {
            throw err;
        });
    }

    /**
     * Поиск задачи по ID
     *
     * @param taskID - идентификатор задачи
     * @returns Одна конкретная запись задачи
     * @throws Ошибка базы данных при неудачном исходе
     */
    public async findTaskByID(taskID: number): Promise<TaskEntity | null> {
        return await this.repository.findOne({ where: { taskID } }).catch((err) => {
            throw err;
        });
    }
}
