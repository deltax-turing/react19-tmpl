FROM node:24.4.1-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM fholzer/nginx-brotli:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY localhost+2.pem /etc/ssl/localhost+2.pem
COPY localhost+2-key.pem /etc/ssl/localhost+2-key.pem
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80 443