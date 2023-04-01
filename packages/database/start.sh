#!/bin/env sh

#load environment variables from .nev file if exists
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

echo "Starting Mysql Container... !";

docker run --rm -d -p 33061:3306 -v $(pwd)/mysql-conf:/etc/mysql/conf.d  -v $(pwd)/data_maria:/var/lib/mysql --name mariadb -e MARIADB_DATABASE="test" -e MYSQL_ROOT_HOST=% -e MARIADB_ROOT_PASSWORD="12345" mariadb:latest
