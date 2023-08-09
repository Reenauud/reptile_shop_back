#!/bin/bash

# prune docker
docker stop $(docker ps --filter status=running --filter name=reptile_shop_back -q)
docker rm -f $(docker ps --filter status=exited -q)
docker rmi -f $(docker images reptile_shop_back* -q)
docker image prune -f

# fix for "Permission denied" error
sudo chmod -R 777 reptile_shop_back/

# prepare new deployment folder
mv reptile_shop_back/ old_reptile_shop_back/
git clone git@github.com:Reenauud/reptile_shop_back.git
cd reptile_shop_back/
git pull -f --rebase origin main
mkdir dbData

# récupérer les .env uploadés précédemment avec scp et les déplacer ici
mv ../dotenv/.env.backend .env

# move old database to new folder
mv ../old_reptile_shop_back/dbData/ .
# fix for "no permission to read" error
sudo chmod -R 777 dbData/

# build docker images
docker compose -f docker-compose.yml build --no-cache

# start containers
docker compose -f docker-compose.yml up >~/logs/reptile_shop_back/log.compose.$(date +"%s") 2>&1 &
disown

# delete old folder
sudo rm -Rf ~/old_reptile_shop_back/