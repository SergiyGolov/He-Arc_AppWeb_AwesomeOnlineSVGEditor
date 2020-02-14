#!/bin/bash

#Mode maintenance on
php artisan down

# Récupération de la dernière version sur deploy
git pull

# Suppression des messages d'erreurs
sed -i 's/APP_ENV=.*/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=.*/APP_DEBUG=false/' .env

# Mise à jour des composants
npm install
composer install --optimize-autoloader

# Migration de la base de données
php artisan migrate

# Optimisation
php artisan config:cache

# Mode production -> minification, ....
npm run production

#Mode maintenance off
php artisan up

@echo off
GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "${GREEN}\n\t------------------------------"
echo -e "\t| Production ran successfully |"
echo -e "\t------------------------------${NC}"
