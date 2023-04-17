FROM node:alpine as deps
WORKDIR /app
COPY yarn.lock package.json ./
RUN mkdir -p packages/common packages/app
COPY ./packages/common ./packages/common
COPY ./packages/server ./packages/server
RUN yarn install
EXPOSE 4000
CMD ["yarn", "start"]
