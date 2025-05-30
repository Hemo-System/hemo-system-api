FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.prod .env

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate reset && npx prisma generate && npx prisma migrate deploy && npm run prisma:seed && npm run start:prod"]