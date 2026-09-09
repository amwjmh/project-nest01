# ---- 禁用阿里云废弃镜像,使用 npmmirror 官方新地址 ----
# https://registry.npmmirror.com (原 https://npm.aliyun.com 已废弃)

FROM node:18-alpine3.14 as builder-stage

ARG NODE_ENV

WORKDIR /app

# 启用 pnpm (与项目锁文件 pnpm-lock.yaml 匹配)
RUN npm config set registry https://registry.npmmirror.com && \
    corepack enable && corepack prepare pnpm@latest --activate

# 先复制 lock 文件,利用 Docker 缓存层
COPY package.json pnpm-lock.yaml ./

# --frozen-lockfile 严格按照锁文件安装,不重新解析,更快更稳
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:18-alpine3.14 as runner-stage

ARG NODE_ENV

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com && \
    npm install pm2 -g

# 运行阶段只装生产依赖,排除 devDependencies (eslint/jest/typescript 等)
COPY --from=builder-stage /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder-stage /app/dist /app/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["pm2-runtime", "main.js"]
