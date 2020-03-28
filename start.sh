yarn install && yarn run start:dev
#!/bin/bash
ROOTDIR=./php
PORT=8080

cd $ROOTDIR || exit
source ./sendgrid.env

#On iOS: this way built-in server supports ipv6 only
php -S localhost:$PORT -c cli_server.ini

#On iOS: server supports ipv4 only
#php -S 127.0.0.1:$PORT -c cli_server.ini
