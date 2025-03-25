#!/usr/bin/env bash
sudo apt update && sudo apt install nodejs npm

# Stop any existing instance of the application 
pm2 stop Before_app 

# Change to the project directory
cd BeforeApplication/

# Install application dependencies
npm install

# Build the React application
npm run build

# Install serve globally to host the build
npm install -g serve

# Start the React application using PM2
pm2 start serve --name example_app -- -s build
