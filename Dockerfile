FROM node:lts-alpine

# Create destination directory
RUN mkdir -p /usr/src/tickets-admin
WORKDIR /usr/src/tickets-admin
COPY ./ .

# Install dependencies and build application
RUN cp .env.example .env
RUN yarn install && yarn build

# Expose port 3000 on container
EXPOSE 3000
