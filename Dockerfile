FROM node:lts AS build

WORKDIR /usr/src/app
COPY . .
RUN npm ci
CMD ["npm", "run", "build"]


FROM node:lts

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/* /dist/*
RUN npm ci

ENV NAME BOT_TOKEN
ENV NAME TGG_TOKEN

CMD ["npm", "run", "start:prod"]
