FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
