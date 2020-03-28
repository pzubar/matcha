#!/bin/bash
ROOTDIR=./php
PORT=8100

source ./sendgrid.env
cd $ROOTDIR || exit

#On iOS: this way built-in server supports ipv6 only
(php -S localhost:$PORT -c cli_server.ini) & (yarn install && yarn run start:dev)
