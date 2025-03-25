#!/usr/bin/env bash

# Update system and install nodejs and npm (consider using nvm for version management)
sudo apt update && sudo apt install -y nodejs npm

# Stop any existing instance of the application (make sure this is the correct pm2 name)
pm2 stop Before_app || true  # Will not fail if the app isn't running

# Change to the project directory
cd BeforeApplication/ || { echo "Directory 'BeforeApplication' not found!"; exit 1; }

# Install application dependencies
npm install

# Build the React application
npm run build

# Install serve globally to serve the build files
npm install -g serve

# Start the React app using PM2 (make sure pm2 is installed globally)
pm2 start serve --name Before_Application -- -s build  # Serving the build directory on port 3000

# Optionally save the PM2 process list (so it starts on system reboot)
pm2 save

# Optionally, configure PM2 to run on startup
pm2 startup
