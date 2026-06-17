# Build the static site at the domain root (served behind the load balancer),
# then serve it with nginx. No serving domain is baked in — the site is fully
# portable across whatever host/LB serves it.
FROM node:22-alpine AS build
WORKDIR /app
ENV BASE_PATH=/
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
