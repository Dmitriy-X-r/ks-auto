# --- Build stage ---
FROM node:20-bullseye AS builder

WORKDIR /app

# Прокидываем build-аргументы
ARG API_DOMAIN
ARG NEXT_PUBLIC_API_DOMAIN
ARG API_BASIC_LOGIN
ARG API_BASIC_PASSWORD
ARG NEXT_PUBLIC_MAIN_DOMAIN

# Переменные окружения для сборки
ENV API_DOMAIN=${API_DOMAIN}
ENV NEXT_PUBLIC_API_DOMAIN=${NEXT_PUBLIC_API_DOMAIN}
ENV API_BASIC_LOGIN=${API_BASIC_LOGIN}
ENV API_BASIC_PASSWORD=${API_BASIC_PASSWORD}
ENV NEXT_PUBLIC_MAIN_DOMAIN=${NEXT_PUBLIC_MAIN_DOMAIN}

# Копируем lockfile и package.json
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Устанавливаем зависимости
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found" && exit 1; \
  fi

# Копируем весь проект
COPY . .
RUN rm -rf .next
# Билдим проект
RUN npm run build

# --- Production stage ---
FROM node:20-bullseye

WORKDIR /app

# Копируем только необходимые файлы
COPY --from=builder /app/package.json /app/package-lock.json* /app/pnpm-lock.yaml* /app/yarn.lock* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Продакшн переменные
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5400
EXPOSE 5400

CMD ["npm", "start"]
