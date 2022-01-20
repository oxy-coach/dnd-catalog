FROM node:14

WORKDIR /app

COPY package.json ./

RUN npm install --production=false

COPY . ./

RUN npm run prod

EXPOSE 8080

CMD ["npm", "run", "serve"]

