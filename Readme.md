# Серверная часть приложения
[Клиентская часть](https://github.com/Mikhas3009/izi-api-introduction-frontend-)
# Запуск приложения

## Разворачивание с помощью Docker

Для запуска приложения с использованием Docker выполните следующие шаги:

1. Клонируйте репозиторий:
   git clone <https://github.com/Mikhas3009/izi-api-introduction-backend-.git>
2. Соберите и запустите контейнеры
   docker-compose up --build
3. Сервер доступен по адресу: http://localhost:4000

Документация (Swagger) доступна по адресу
http://localhost:4000/docs

Для работы в POSTMAN импортируйте коллекцию:
IZI-Api.postman_collection.json

# Стуктура проекта
``` bash
src/
 ├── core/                   # Бизнес-логика
 │    ├── entities/          # Сущности (Task)
 │    ├── enums/             # Перечисления
 │    ├── interfaces/        # Интерфейсы (TaskRequestInterface и т.д.)
 │    └── services/          # Сервисы
 │
 ├── application/            # Основной слой приложения 
 │    ├── controllers/       # Контроллеры Express
 │    ├── dto/               # DTO-объекты для API
 │    ├── middlewares/       # Middleware 
 │    └── routers/           # Маршруты Express
 │
 ├── infrastructure/         # Инфраструктура (внешние сервисы)
 │    ├── config/            # Конфиги (db.config.ts, swagger.config.ts)
 │    ├── repository/        # Реализации репозиториев (TypeORM)
 │
 ├── shared/                 # Общие модули
 │    └── utils/             # Утилиты
 │
 ├── app.ts                  # Инициализация Express-приложения
 └── server.ts               # Точка входа (запуск сервера)
```
