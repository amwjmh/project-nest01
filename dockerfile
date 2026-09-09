FROM node:18-alpine3.14 as builder-stage

ARG NODE_ENV

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18-alpine3.14 as runner-stage

COPY --from=builder-stage /app/dist /app/
COPY --from=builder-stage /app/package.json /app/package.json

ARG NODE_ENV

WORKDIR /app

RUN pnpm config set registry https://registry.npmmirror.com

RUN pnpm install

RUN pnpm install pm2 -g

EXPOSE 3000

ENV NODE_ENV=production

CMD ["pm2-runtime", "main.js"]

