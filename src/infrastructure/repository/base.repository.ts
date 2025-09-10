import { Repository, EntityTarget, ObjectLiteral, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/db.config";

/**
 * Абстрактный класс репозиторитория для работы с сущностью TaskEntity
 *
 * Класс реализует один метод getModelInstance для получения сущности TypeORM
 *
 */
export abstract class BaseRepository<T extends ObjectLiteral> {
    protected readonly repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }

    /**
     * Метод для получения сущности TypeORM
     * @param {DeepPartial<T>} model
     * Объект с полями заданного шаблона, сущность которого надо получить
     * @returns {<T>}
     * Возвращает TypeORM сущность по указанному шаблону
     */
    public getModelInstance(model: DeepPartial<T>): T {
        return this.repository.create(model);
    }
}
