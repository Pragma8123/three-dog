FROM node:lts

WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN apt update
RUN apt install -y libtool-bin
RUN npm ci
COPY . .
RUN npm run test
RUN npm run build

ENV NAME BOT_TOKEN
ENV NAME TGG_TOKEN

CMD ["npm", "run", "start:prod"]
