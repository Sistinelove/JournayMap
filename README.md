# Проект для просмотра достопримечательностей. Проект написан на React + typescript

## В качестве фейковых данных, используется json-server. Для запуска сервера нужно выполнить команду для генерации

## фейковых данных

'npm run create-json-data'

## Запуск сервера для фейковых данных

`npm run start-json-server`

## Запуск проекта

`npm run dev`

## Документация к REST API. Так же можно посмотреть примеры реализации запросов в файле AttractionController.ts

`GET /attractions: Получить список всех достопримечательностей.`

`GET /attractions/{id}: Получить информацию о конкретной достопримечательности.`

`POST /attractions: Создать новую достопримечательность.`

`PUT /attractions/{id}: Обновить информацию о достопримечательности.`

`DELETE /attractions/{id}: Удалить достопримечательность.`
