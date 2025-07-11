FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
