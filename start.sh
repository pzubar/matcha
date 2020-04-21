#!/bin/bash
ROOTDIR=./php
PORT=8100

source ./sendgrid.env
source  ./.env
cd $ROOTDIR || exit

trap 'kill %1;' SIGINT
(php -S 127.0.0.1:$PORT -c cli_server.ini) | tee php.log | sed -e 's/^/[PHP Server] /' &
(yarn install && yarn run migrate up && yarn run start:dev) | tee node.log | sed -e 's/^/[NodeJS Server] /'
