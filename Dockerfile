# # with node installation
FROM node:14.18-alpine
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . .
COPY .env.example .env

RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build"]

EXPOSE 3000
#############################################
#############################################
#############################################

# # without the node installation
# # required build logic outside the docker
# FROM nginx:alpine

# WORKDIR /usr/src/app

# RUN rm -rf /usr/share/nginx/html/*
# COPY nginx.conf /etc/nginx/nginx.conf

# COPY build /usr/share/nginx/html

# EXPOSE 80