import { createApp } from "./app";
import "reflect-metadata";
import { AppDataSource } from "./config/db.config";

async function bootstrap() {

    await AppDataSource.initialize();
    console.log("✅ Database connected");


    const app = createApp();
    const PORT = process.env.PORT || 4000;

    (await app).listen(PORT, (err) => {
        console.log(`Сервер запущен на ${PORT} порту`)
        if (err) {
            console.log(err)
        }
    })

}

bootstrap()