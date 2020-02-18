#FROM node:carbon
FROM omegacoleman/vue-cli
WORKDIR /server
COPY . /server
RUN cd client && npm i && npm run build && cd .. && npm install -g nodemon && npm i
EXPOSE 3000
CMD [ "nodemon", "server.js" ]