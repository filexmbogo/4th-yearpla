# Use an official Node.js image as the base
FROM node:18

# Install MongoDB from MongoDB's official repository and tini for multi-process management
RUN apt-get update && \
    apt-get install -y gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y mongodb-org tini

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code
COPY . .

# Expose ports for the Node.js app and MongoDB
EXPOSE 10000 27017

# Create MongoDB data directory
RUN mkdir -p /data/db

# Add an entrypoint script to start both MongoDB and Node.js
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Use tini as the init system
ENTRYPOINT ["/usr/bin/tini", "--"]

# Run the entrypoint script to start MongoDB and Node.js
CMD ["./entrypoint.sh"]
