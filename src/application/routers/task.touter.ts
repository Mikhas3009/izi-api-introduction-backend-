import { TaskController } from "../controllers/task.controller";
import { validateAndTransformTask } from "../middlewars/transformTaskRequest";
import { BaseRouter } from "./base.router";

export class TaskRouter extends BaseRouter<TaskController> {
    protected initController(): TaskController {
        return new TaskController();
    }

    protected registerRoutes(): void {
        this.router.get("/api/tasks", this.controller.getTasks.bind(this.controller));
        this.router.post(
            "/api/tasks",
            validateAndTransformTask,
            this.controller.addTask.bind(this.controller),
        );
        this.router.patch(
            "/api/tasks/:id",
            validateAndTransformTask,
            this.controller.setTaskStasus.bind(this.controller),
        );
        this.router.delete("/api/tasks/:id", this.controller.deleteTask.bind(this.controller));
        this.router.get("/api/tasks/:id", this.controller.getTaskByID.bind(this.controller));
    }
}
