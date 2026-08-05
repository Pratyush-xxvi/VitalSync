# Stage 1: Build static assets using Node 20
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build Vite bundle
COPY . .
RUN npm run build

# Stage 2: Serve static files using Nginx Alpine
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
