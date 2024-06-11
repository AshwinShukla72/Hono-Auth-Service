FROM oven/bun:1.1 as base

COPY package.json bun.lock* ./
RUN bun install

COPY src/index.ts ./src/index.ts
RUN bun install --frozen-lockfile
EXPOSE 3000

CMD "bun" "run" "dev"