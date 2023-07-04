#DEV
FROM node:18

WORKDIR /api
COPY package.json ./

RUN npm install

COPY src ./src
COPY tsconfig.json ./

CMD ["npm", "start"]