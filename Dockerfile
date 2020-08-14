FROM node:12
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "app.js" ]