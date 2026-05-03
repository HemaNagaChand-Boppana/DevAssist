FROM node:18

# install Java
RUN apt-get update && apt-get install -y openjdk-17-jdk

# set working dir
WORKDIR /app

# copy backend package files
COPY backend/package*.json ./

# install deps
RUN npm install

# copy backend source code
COPY backend/ .

EXPOSE 5000

CMD ["node", "server.js"]