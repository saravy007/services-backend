FROM node:18.20.3-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN apt-get update && apt install vim -y
COPY . .
WORKDIR /app/frontend
RUN npm install
RUN npm run build
COPY /frontend/src/assets /app/frontend/dist/src/assets
WORKDIR /app
CMD ["node", "index.js"]