FROM node:18.20.3-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN apt-get update && apt install vim -y
COPY . .
CMD ["node", "index.js"]