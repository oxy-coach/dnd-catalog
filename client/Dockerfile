FROM node:14

RUN mkdir /client
COPY . /client
WORKDIR /client

RUN cd /client

RUN npm install --production=false

RUN npm run prod

EXPOSE 8080

CMD ["npm", "run", "serve"]
