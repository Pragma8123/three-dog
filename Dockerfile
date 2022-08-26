FROM node:lts

WORKDIR /usr/src/app
COPY . .
RUN npm ci

ENV NAME BOT_TOKEN
ENV NAME TGG_TOKEN

CMD ["npm", "start"]
