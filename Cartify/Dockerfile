FROM node:18-alpine AS builder
RUN apk add --no-cache chromium nss freetype harfbuzz ttf-freefont openssl
ENV CHROME_BIN=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine
COPY --from=builder /app/dist/cartify /usr/share/nginx/html
COPY openssl.conf /etc/ssl/openssl.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add --no-cache openssl && \
    mkdir -p /etc/ssl/certs /etc/ssl/private && \
    openssl req -x509 -nodes -days 365 \
      -newkey rsa:2048 \
      -keyout /etc/ssl/private/localhost-key.pem \
      -out /etc/ssl/certs/localhost.pem \
      -config /etc/ssl/openssl.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
