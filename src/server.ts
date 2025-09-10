import { createApp } from "./app";
import "reflect-metadata";
import { AppDataSource } from "./infrastructure/config/db.config";

async function bootstrap() {
    await AppDataSource.initialize();
    console.log("База данных успешно подключена");

    const app = createApp();
    const PORT = process.env.PORT || 4000;

    (await app).listen(PORT, (err) => {
        console.log(`Сервер запущен на ${PORT} порту`);
        if (err) {
            console.log(err);
        }
    });
}

bootstrap();
