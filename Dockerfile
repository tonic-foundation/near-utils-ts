FROM node:16-alpine

WORKDIR /opt/code

ENV NODE_ENV development

COPY . /opt/code

RUN yarn install --immutable

RUN yarn build:all
