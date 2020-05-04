FROM node:12.16.3
RUN ["mkdir", "/home/application"]
COPY dist /home/application/dist
COPY package.json /home/application/package.json
COPY .env.example /home/application/.env.example
COPY .environments  /home/application/.environments
COPY dotenv.config.js /home/application/dotenv.config.js
WORKDIR /home/application
RUN npm install --production
CMD ["npm", "start"]
