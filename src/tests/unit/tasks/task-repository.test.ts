import { TaskRepository } from "../../../infrastructure/repository/task.repository";

describe("TaskRepository (unit)", () => {
    let taskRepository: TaskRepository;
    let mockRepo: any;

    beforeEach(() => {
        taskRepository = new TaskRepository();

        mockRepo = {
            find: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
        };

        (taskRepository as any).repository = mockRepo;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("должен вернуть список задач (getTasks)", async () => {
        const tasks = [{ taskID: 1, taskTitle: "Test", taskIsCompleted: false }];
        mockRepo.find.mockResolvedValue(tasks);

        const result = await taskRepository.getTasks();

        expect(mockRepo.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual(tasks);
    });

    it("должен добавить задачу (addTask)", async () => {
        const newTask = { taskTitle: "New Task", taskIsCompleted: false };
        const savedTask = { taskID: 1, ...newTask };
        mockRepo.save.mockResolvedValue(savedTask);

        const result = await taskRepository.addTask(newTask);

        expect(mockRepo.save).toHaveBeenCalledWith(newTask);
        expect(result).toEqual(savedTask);
    });

    it("должен обновить задачу (updateTask)", async () => {
        const updateResult = { affected: 1 };
        mockRepo.update.mockResolvedValue(updateResult);

        const result = await taskRepository.updateTask(1, { taskIsCompleted: true });

        expect(mockRepo.update).toHaveBeenCalledWith(1, { taskIsCompleted: true });
        expect(result).toEqual(updateResult);
    });

    it("должен удалить задачу (deleteTask)", async () => {
        const deleteResult = { affected: 1 };
        mockRepo.delete.mockResolvedValue(deleteResult);

        const result = await taskRepository.deleteTask(1);

        expect(mockRepo.delete).toHaveBeenCalledWith(1);
        expect(result).toEqual(deleteResult);
    });

    it("должен найти задачу по заголовку (findTaskByTitle)", async () => {
        const task = { taskID: 1, taskTitle: "Test", taskIsCompleted: false };
        mockRepo.findOne.mockResolvedValue(task);

        const result = await taskRepository.findTaskByTitle("Test");

        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { taskTitle: "Test" } });
        expect(result).toEqual(task);
    });

    it("должен найти задачу по ID (findTaskByID)", async () => {
        const task = { taskID: 1, taskTitle: "Test", taskIsCompleted: false };
        mockRepo.findOne.mockResolvedValue(task);

        const result = await taskRepository.findTaskByID(1);

        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { taskID: 1 } });
        expect(result).toEqual(task);
    });
});
