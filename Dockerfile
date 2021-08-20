FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
RUN npm install --force
COPY . .
CMD [ "npm", "start" ]
