FROM node:lts-alpine

# Create destination directory
RUN mkdir -p /usr/src/tickets-admin
WORKDIR /usr/src/tickets-admin
COPY ./ .

# Install dependencies and build application
RUN cp .env.example .env
RUN yarn install && yarn build

#Instala las dependencias del proyecto
RUN npm install

# Expose port 3000 on container
EXPOSE 5173

#Comando para ejecutar el servidor de desarrollo de React
CMD ["npm", "run", "dev"]
