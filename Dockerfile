FROM node:16
WORKDIR /app
COPY package.json /app
RUN npm install --force
ENTRYPOINT ["npm start"]
