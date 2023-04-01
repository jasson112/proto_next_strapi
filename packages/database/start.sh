#!/bin/env sh

#load environment variables from .nev file if exists
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

echo "Starting Mysql Container...";

docker run --rm -d -p 3306:3306 -v $(pwd)/mysql-conf:/etc/mysql/conf.d  -v $(pwd)/data_maria:/var/lib/mysql --name mariadb -e MYSQL_ROOT_HOST=127.0.0.1 -e MARIADB_ROOT_PASSWORD=${DATABASE_PASSWORD} mariadb:latest
