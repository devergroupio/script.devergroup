FROM node:10.17.0
RUN ["mkdir", "/home/application"]
COPY dist /home/application/dist
COPY .next /home/application/.next
COPY next.config.js /home/application/next.config.js
COPY package.json /home/application/package.json
COPY .env.example /home/application/.env.example
COPY .environments  /home/application/.environments
COPY dotenv.config.js /home/application/dotenv.config.js
WORKDIR /home/application
RUN npm install --production
CMD ["npm", "start"]
