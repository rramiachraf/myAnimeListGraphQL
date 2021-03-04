FROM node:14

WORKDIR /graphql-server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

ENV PORT 5000

EXPOSE 5000

CMD [ "yarn", "start" ]