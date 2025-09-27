# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Produz build de produção
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:1.27-alpine AS runtime
LABEL maintainer="EconoMe Frontend" \
    org.opencontainers.image.source="https://github.com/LucasAlmeidaCase/app-econome-frontend" \
    org.opencontainers.image.title="EconoMe Front-end" \
    org.opencontainers.image.description="Interface web do sistema EconoMe"

# Remove configuração default e adiciona SPA fallback
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
# Variáveis para configurar endpoints em runtime (documentadas no README)
ENV VITE_API_URL="" \
    VITE_PEDIDOS_API_URL="" \
    VITE_PARTICIPANTES_API_URL=""

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -q -O /dev/null http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
