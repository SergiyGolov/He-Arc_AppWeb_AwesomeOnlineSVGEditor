#!/bin/bash

sed -i 's/APP_ENV=.*/APP_ENV=local/' .env
sed -i 's/APP_DEBUG=.*/APP_DEBUG=true/' .env