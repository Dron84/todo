FROM omegacoleman/vue-cli
#RUN apk add --update nodejs npm
WORKDIR /client
COPY ./package*.json ./
COPY . .
EXPOSE 8080
RUN npm i
CMD ["npm", "start"]