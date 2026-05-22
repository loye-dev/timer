FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG PLAUSIBLE_URL
ARG PLAUSIBLE_DOMAIN
ENV PLAUSIBLE_URL=$PLAUSIBLE_URL
ENV PLAUSIBLE_DOMAIN=$PLAUSIBLE_DOMAIN

COPY . .
RUN bun run generate


FROM nginx:alpine

ARG PLAUSIBLE_URL
ENV PLAUSIBLE_URL=$PLAUSIBLE_URL

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
