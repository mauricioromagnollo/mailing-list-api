FROM node:18.7.0

RUN apk add --no-cache bash
RUN apt-get update -qq
RUN apt-get install -y build-essential
RUN apt-get install -y git

USER node

WORKDIR /home/node/app
