###################
# DEVELOPMENT
###################

FROM node:hydrogen-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Install dependencies for node-gyp
RUN apk add --no-cache libtool make automake autoconf g++ python3

# Copy application dependency manifests
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Copy app source
COPY --chown=node:node . .

USER node


###################
# BUILD
###################

FROM node:hydrogen-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:hydrogen-alpine AS production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/client/dist ./client/dist
COPY --chown=node:node --from=build /usr/src/app/gnr.ogg .

# External environment variables
ENV APP_URL=
ENV BOT_TOKEN=
ENV TGG_TOKEN=
ENV DISCORD_OAUTH_CLIENT_ID=
ENV DISCORD_OAUTH_CLIENT_SECRET=

# HTTP port
EXPOSE 3000

CMD ["node", "dist/main.js"]
