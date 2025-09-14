import { CacheKeys } from "../../../core/enums/cashe-keys.enum";
import { TaskService } from "../../../core/services/task.service";
import { TaskEntity } from "../../../infrastructure/entities/task.entity";
import { TaskRepository } from "../../../infrastructure/repository/task.repository";
import { CacheInterface } from "../../../shared/interfaces/cashe.interface";
import { HttpException } from "../../../shared/utils/http-error";

describe("TaskService (unit)", () => {
    let taskService: TaskService;
    let mockRepo: jest.Mocked<TaskRepository>;
    let mockCache: jest.Mocked<CacheInterface<TaskEntity>>;

    const sampleTask: TaskEntity = {
        taskID: 1,
        taskTitle: "Test",
        taskIsCompleted: false,
    } as TaskEntity;

    beforeEach(() => {
        mockRepo = {
            getTasks: jest.fn(),
            getModelInstance: jest.fn().mockImplementation((obj) => obj),
            findTaskByTitle: jest.fn(),
            addTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
            findTaskByID: jest.fn(),
        } as any;

        mockCache = {
            saveToCache: jest.fn(),
            getFromCache: jest.fn(),
            deleteFromCache: jest.fn(),
        } as any;

        taskService = new TaskService(mockRepo, mockCache);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("должен вернуть список задач (getTasks)", async () => {
        mockRepo.getTasks.mockResolvedValue([sampleTask]);

        const result = await taskService.getTasks();

        expect(mockRepo.getTasks).toHaveBeenCalledTimes(1);
        expect(result).toEqual([sampleTask]);
    });

    it("должен создать новую задачу (createTask)", async () => {
        const req: any = { body: { task: sampleTask } };
        mockRepo.findTaskByTitle.mockResolvedValue(null);
        mockRepo.addTask.mockResolvedValue(sampleTask);

        const result = await taskService.createTask(req);

        expect(mockRepo.findTaskByTitle).toHaveBeenCalledWith(sampleTask.taskTitle);
        expect(mockCache.saveToCache).toHaveBeenCalledWith(
            `${CacheKeys.TASKS}:${sampleTask.taskID}`,
            sampleTask,
            60 * 60,
        );
        expect(result).toEqual(sampleTask);
    });

    it("должен выбросить ошибку если задача уже существует (createTask)", async () => {
        const req: any = { body: { task: sampleTask } };
        mockRepo.findTaskByTitle.mockResolvedValue(sampleTask);

        await expect(taskService.createTask(req)).rejects.toThrow(HttpException);
    });

    it("должен обновить задачу (setTaskStatus)", async () => {
        const req: any = { params: { id: "1" }, body: { task: { taskIsCompleted: true } } };
        mockRepo.updateTask.mockResolvedValue({ affected: 1 } as any);

        const result = await taskService.setTaskStatus(req);

        expect(mockRepo.updateTask).toHaveBeenCalledWith(1, { taskIsCompleted: true });
        expect(result).toBe(1);
    });

    it("должен выбросить ошибку при некорректном id (setTaskStatus)", async () => {
        const req: any = { params: { id: "1" }, body: { task: { taskIsCompleted: true } } };
        mockRepo.updateTask.mockResolvedValue({ affected: 0 } as any);

        await expect(taskService.setTaskStatus(req)).rejects.toThrow(HttpException);
    });

    it("должен удалить задачу (deleteTask)", async () => {
        const req: any = { params: { id: "1" } };
        mockRepo.deleteTask.mockResolvedValue({ affected: 1 } as any);

        const result = await taskService.deleteTask(req);

        expect(mockRepo.deleteTask).toHaveBeenCalledWith(1);
        expect(mockCache.deleteFromCache).toHaveBeenCalledWith(`${CacheKeys.TASKS}:1`);
        expect(result).toBe(1);
    });

    it("должен выбросить ошибку если задача не найдена (deleteTask)", async () => {
        const req: any = { params: { id: "1" } };
        mockRepo.deleteTask.mockResolvedValue({ affected: 0 } as any);

        await expect(taskService.deleteTask(req)).rejects.toThrow(HttpException);
    });

    it("должен вернуть задачу из кэша (getTaskByID)", async () => {
        const req: any = { params: { id: "1" } };
        mockCache.getFromCache.mockResolvedValue(sampleTask);

        const result = await taskService.getTaskByID(req);

        expect(mockCache.getFromCache).toHaveBeenCalledWith(`${CacheKeys.TASKS}:1`);
        expect(result).toEqual(sampleTask);
    });

    it("должен найти задачу в БД если её нет в кэше (getTaskByID)", async () => {
        const req: any = { params: { id: "1" } };
        mockCache.getFromCache.mockResolvedValue(null);
        mockRepo.findTaskByID.mockResolvedValue(sampleTask);

        const result = await taskService.getTaskByID(req);

        expect(mockRepo.findTaskByID).toHaveBeenCalledWith(1);
        expect(result).toEqual(sampleTask);
    });

    it("должен выбросить ошибку если задачи не существует (getTaskByID)", async () => {
        const req: any = { params: { id: "1" } };
        mockCache.getFromCache.mockResolvedValue(null);
        mockRepo.findTaskByID.mockResolvedValue(null);

        await expect(taskService.getTaskByID(req)).rejects.toThrow(HttpException);
    });
});
