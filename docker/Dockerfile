FROM node:latest AS builder
ARG XCONF_PATH
WORKDIR /root/build
COPY . .
RUN yarn install --non-interactive --frozen-lockfile
RUN yarn build

FROM nginx:latest
WORKDIR /home/nginx
COPY --from=builder /root/build/dist /home/nginx/dist
COPY client/entry/robots.txt /home/nginx/dist/robots.txt

STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
