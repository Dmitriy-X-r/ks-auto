#!/bin/sh
# Скрипт для корректных прав на .next при dev

# Создаём директорию .next, если её нет
mkdir -p /app/.next

# Даем права node пользователю
chown -R node:node /app/.next

# Запускаем команду контейнера (npm run dev)
exec "$@"
