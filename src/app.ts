import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import { handleNotFound } from "./middlewars/not-found-handler";
import { TaskRouter } from "./routers/task.touter";
import { setupSwagger } from "./config/swagget.config";


export async function createApp() {

    const app = express();
    app.use(cors())
    app.use(bodyParser.json())
    setupSwagger(app);
    app.use(express.urlencoded({ extended: true }))
    app.use(new TaskRouter().getRouter())
    app.get('/', (req, res) => {
        res.send("Hello")
    })
    app.use(handleNotFound)

    return app
}