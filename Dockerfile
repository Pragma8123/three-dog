FROM node:latest

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "ffmpeg", "build-essential", "automake"]

WORKDIR /usr/src/app
COPY . .
RUN npm i

ENV NAME CMD_PREFIX
ENV NAME BOT_TOKEN
ENV NAME DBL_TOKEN
ENV NAME DDBL_TOKEN
ENV NAME GUILDS_PER_SHARD

CMD ["npm", "start"]
