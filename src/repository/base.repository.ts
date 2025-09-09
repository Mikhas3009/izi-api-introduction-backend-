import { Repository, EntityTarget, ObjectLiteral, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/db.config";


export abstract class BaseRepository<T extends ObjectLiteral> {

    protected readonly repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }
   
    /**
     * Метод для получения сущности TypeORM
     */
    public getModelInstance(model: DeepPartial<T>): T {
        return this.repository.create(model);
    }
}