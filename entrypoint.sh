#!/bin/bash
# Start MongoDB in the background
mongod --dbpath /data/db --bind_ip 0.0.0.0 --fork --logpath /var/log/mongodb.log

# Start the Node.js app
npm start
