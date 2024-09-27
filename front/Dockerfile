FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
