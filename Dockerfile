FROM node:lts

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "ffmpeg", "build-essential", "make", "python", "python2"]

WORKDIR /usr/src/app
COPY . .
RUN npm i

ENV NAME CMD_PREFIX
ENV NAME BOT_TOKEN
ENV NAME TGG_TOKEN

CMD ["npm", "start"]
