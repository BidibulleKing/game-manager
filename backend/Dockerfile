FROM oven/bun:alpine AS build
RUN adduser -S app
USER app

WORKDIR /app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile
COPY --chown=app:app . .

EXPOSE 8000
CMD ["bun", "run", "start"]