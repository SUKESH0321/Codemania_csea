# ──────────────────────────────────────────────
# Stage 1 — Build the Vite/React app
# ──────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci

# Build-time env vars (Vite bakes these into the static bundle)
ARG VITE_CORE_BACKEND_URL
ARG VITE_EXECUTION_SERVER_URL
ENV VITE_CORE_BACKEND_URL=$VITE_CORE_BACKEND_URL
ENV VITE_EXECUTION_SERVER_URL=$VITE_EXECUTION_SERVER_URL

# Copy source and build
COPY . .
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2 — Serve with nginx
# ──────────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html/codemania

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
