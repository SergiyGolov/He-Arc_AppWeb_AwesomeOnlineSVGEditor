#!/bin/bash

sed -i 's/APP_ENV=.*/APP_ENV=production/' .env
sed -i 's/APP_DEBUG=.*/APP_DEBUG=false/' .env

npm run production
composer install --optimize-autoloader
php artisan config:cache

