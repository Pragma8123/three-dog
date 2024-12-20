###################
# DEVELOPMENT
###################

FROM node:lts-jod AS development

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

FROM node:lts-jod AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build && npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:lts-jod AS production

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

ENV NODE_ENV=production

# HTTP port
EXPOSE 3000

CMD ["dumb-init", "npm", "run", "start:prod"]
