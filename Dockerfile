FROM node:20.10.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npx prisma migrate dev --name init
COPY . .
EXPOSE 5001
CMD ["npm", "start"]
