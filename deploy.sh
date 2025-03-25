#!/usr/bin/env bash

# Update system and install nodejs and npm (consider using nvm for version management)
sudo apt update && sudo apt install -y nodejs npm

# Install PM2 globally
sudo npm install -g pm2

# Stop existing PM2 process if running
pm2 stop Before_Application || true  # Won't fail if process doesn't exist

# Navigate to project directory
cd BeforeApplication/ || { echo "Directory 'BeforeApplication' not found!"; exit 1; }

# Install dependencies
npm install

# Build React app
npm run build

# Install serve globally
sudo npm install -g serve

# Start React app using serve with PM2
pm2 start serve --name Before_Application -- -s build -l tcp://0.0.0.0:3000

# Save PM2 process list (ensures it runs on reboot)
pm2 save

# Configure PM2 to start on boot
pm2 startup