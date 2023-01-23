###################
# DEVELOPMENT
###################

FROM node:19.4.0-slim AS development

# Create app directory
WORKDIR /usr/src/app

# Install dependencies for node-gyp
RUN apt-get update \
    && apt-get install -y \
    g++ \
    libtool-bin \
    make \
    python3 \
    && rm -rf /var/lib/apt/lists/*

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

FROM node:19.4.0-slim AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

RUN npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:19.4.0-slim AS production

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node --from=build /usr/src/app/package*.json ./
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

ENV NODE_ENV production

# HTTP port
EXPOSE 3000

CMD ["dumb-init", "npm", "run", "start:prod"]
