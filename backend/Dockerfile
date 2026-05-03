FROM node:18

# install Java
RUN apt-get update && apt-get install -y openjdk-17-jdk

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]