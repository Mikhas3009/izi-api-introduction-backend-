import { Router } from "express";
/**
 * Абстрактный класс Роутера для всех Express-Роутеров
 *
 * Класс содерижт в себе абстрактные методы для регистрации роутов и инициализации контроллера, делегируя реализацию классам-потомка
 *
 */
export abstract class BaseRouter<C> {
    protected readonly router: Router;
    protected readonly controller: C;

    constructor() {
        this.router = Router();
        this.controller = this.initController();
        this.registerRoutes();
    }

    /**
     * Метод для регистрации всех роутингов конкретной сущности
     */
    protected abstract registerRoutes(): void;

    /**
     * Метод для получения экземпляра Express-Router
     */
    public getRouter(): Router {
        return this.router;
    }

    /**
     * Метод для инициализации контроллера
     */
    protected abstract initController(): C;
}
