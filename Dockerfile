# ========================
# Base（glibc）
# ========================
FROM node:22-bookworm AS base
WORKDIR /app

# ========================
# 依赖阶段
# ========================
FROM base AS deps
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com \
 && npm ci

# ========================
# 构建阶段
# ========================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ========================
# 运行阶段
# ========================
FROM node:22-bookworm AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# 复制构建产物和包文件
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# 在运行环境重新安装生产依赖（确保原生模块正确编译）
RUN npm config set registry https://registry.npmmirror.com \
 && npm ci --omit=dev \
 && npm cache clean --force

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
