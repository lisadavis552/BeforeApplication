#!/usr/bin/env bash

# Stop any existing instance of the application (if it exists)
pm2 stop example_app || true

# Change to the project directory
cd ExampleApplication/

# Install application dependencies
npm install

# Build the React application
npm run build

# Install serve globally to host the build
npm install -g serve

# Start the React application using PM2
pm2 start serve --name example_app -- -s build
