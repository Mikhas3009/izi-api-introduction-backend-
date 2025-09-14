import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { handleNotFound } from "./application/middlewars/not-found-handler";
import { setupSwagger } from "./infrastructure/config/swagger.config";
import { TaskRouter } from "./application/routers/task.touter";
import { errorMiddleware } from "./application/middlewars/error-handler";

export async function createApp() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    setupSwagger(app);
    app.use(express.urlencoded({ extended: true }));
    app.use(new TaskRouter().getRouter());
    app.get("/", (req, res) => {
        res.send("Hello");
    });
    app.use(errorMiddleware);
    app.use(handleNotFound);

    return app;
}
