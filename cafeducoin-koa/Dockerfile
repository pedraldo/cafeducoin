FROM node:lts-alpine as base
WORKDIR /cafeducoin
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 7654
# RUN chown -R node /cafeducoin
# USER node
# CMD ["npm", "start"]

FROM base as production
ENV NODE_PATH=./dist
RUN npm run build
