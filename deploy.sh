#!/usr/bin/env bash

# Update system and install nodejs and npm (consider using nvm for version management)
sudo apt update && sudo apt install nodejs npm

sudo npm install -g pm2

pm2 stop Before_Applciation

cd BeforeApplication/

npm install

pm2 start ./bin/www --name Before_Application