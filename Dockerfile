# 多阶段构建 - 构建阶段
FROM node:24.4.1-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建生产版本
RUN npm run build

# 生产阶段 - 使用支持 Brotli 的 Nginx
FROM fholzer/nginx-brotli:latest

# 删除默认的 nginx 配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/

# 复制 SSL 证书 (如果有的话)
COPY localhost+2.pem /etc/ssl/localhost+2.pem
COPY localhost+2-key.pem /etc/ssl/localhost+2-key.pem

# 从构建阶段复制构建好的文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80 443