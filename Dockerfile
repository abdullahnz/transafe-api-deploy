FROM node:20-alpine3.16

WORKDIR /usr/src/app

COPY app/package.json .

RUN yarn install
RUN yarn add concurrently
RUN echo "declare module 'midtrans-client'" > node_modules/midtrans-client/index.d.ts

COPY app/ /usr/src/app/

EXPOSE 1337

ENTRYPOINT [ "yarn", "start:dev" ]


