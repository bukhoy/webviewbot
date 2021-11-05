## WebViewBot 

[Бот](https://web_view_bot) для экспорта веб-страниц в формат png и pdf.

#### Варианты экспорта

    - Экспорт в формате pdf
    - Экспорт в формате png
    - Экспорт всей страницы в формате png



## Локальная установка и запуск
1. Склонировать репозиторий
2. Запустить Chrome в headless режиме

```
google-chrome --headless --remote-debugging-port=9222 --start-maximized --hide-scrollbars --window-size=1920,1080
```

3. Настроить файл .env

```
BOT_TOKEN="Токен бота"
```
