FROM node:19-alpine

WORKDIR /app

RUN chown -R node:node /app

COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock

USER node

RUN yarn install
COPY --chown=node:node . .
EXPOSE 4000
CMD [ "yarn", "run", "compile" ]
