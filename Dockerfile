FROM node:lts-alpine3.18

WORKDIR /var/www/github-ui

# Layer caching for faster builds
COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY yarn.lock yarn.lock
COPY package.json package.json
COPY packages/client/package.json packages/client/
COPY packages/server/package.json packages/server/

# We don't want to have to run yarn install if only the code changes, without any package.json changes
RUN yarn install --immutable

COPY packages packages

RUN yarn build

# final image should only have the built files, package.json, and server .env
FROM node:lts-alpine3.18

WORKDIR /var/www/github-ui

COPY --from=0 /var/www/github-ui/package.json package.json
COPY --from=0 /var/www/github-ui/packages/server/package.json packages/server/package.json
COPY --from=0 /var/www/github-ui/packages/server/.env packages/server/.env
COPY --from=0 /var/www/github-ui/packages/server/build packages/server/build
COPY --from=0 /var/www/github-ui/packages/client/package.json packages/client/package.json
COPY --from=0 /var/www/github-ui/packages/client/build packages/client/build

EXPOSE 3000
CMD ["yarn", "start"]
