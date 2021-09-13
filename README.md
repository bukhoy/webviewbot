# WebViewBot

### Запуск

1. Запустить Chrome в headless режиме 
```
google-chrome --headless --remote-debugging-port=9222 --start-maximized --memory-cache-size=104857600 --use-fake-device-for-media-stream --headless --use-fake-ui-for-media-stream --hide-scrollbars --window-size=1920,1080
```

2. Настроить файл .env
```
BOT_TOKEN="Токен бота"
```