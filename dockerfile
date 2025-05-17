FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

RUN npx tsc prisma/seed/seed.ts --outDir prisma/seed

EXPOSE 3000

CMD ["sh", "-c", "node prisma/seed/seed.js && npm run start:prod"]