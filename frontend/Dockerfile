FROM node:16.14-alpine
WORKDIR /app-frontend
 
COPY package*.json ./
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

CMD ["npm", "start"]
