FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3031

EXPOSE $PORT

CMD ["npm", "run", "prod"]

