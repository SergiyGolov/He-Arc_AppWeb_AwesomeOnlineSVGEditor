#!/bin/bash

git pull
sed -i 's/APP_ENV=.*/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=.*/APP_DEBUG=false/' .env

npm run production
composer install --optimize-autoloader
php artisan config:cache

@echo off
GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "${GREEN}\n\t------------------------------"
echo -e "\t| Production ran successfully |"
echo -e "\t------------------------------${NC}"